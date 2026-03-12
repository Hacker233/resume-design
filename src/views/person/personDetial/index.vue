<template>
  <div class="person-detail">
    <!-- 会员信息卡片 -->
    <div class="membership-card" v-if="!userInfo.isAllFree">
      <div class="membership-content" @click="toMembershipReach">
        <div class="membership-icon" :class="{ 'vip-glow': membershipInfo.hasMembership && membershipInfo.daysRemaining > 0 }">
          <img 
            src="@/assets/images/membership.svg" 
            alt="会员" 
            title="会员" 
            width="32" 
          />
          <div v-if="membershipInfo.hasMembership && membershipInfo.daysRemaining > 0" class="vip-glow-effect"></div>
        </div>
        <div class="membership-info">
          <h3 class="membership-title">会员状态</h3>
          <div class="membership-status-wrapper">
            <p class="membership-status" :class="{ 'expired': !membershipInfo.hasMembership || membershipInfo.daysRemaining <= 0, 'active': membershipInfo.hasMembership && membershipInfo.daysRemaining > 0 }">
              <span v-if="!membershipInfo.hasMembership" class="non-vip">非会员</span>
              <span v-else-if="membershipInfo.type === 'lifetime'">
                <span class="vip-badge lifetime">永久会员</span>
                <span class="vip-desc">尊享永久特权</span>
              </span>
              <span v-else-if="membershipInfo.daysRemaining > 0">
                <span class="vip-badge active">会员</span>
                <span class="days-remaining">还剩{{ membershipInfo.daysRemaining }}天</span>
                <span class="vip-desc">尊享会员特权</span>
              </span>
              <span v-else class="expired-status">已过期{{ membershipInfo.expiredDays }}天</span>
            </p>
          </div>
        </div>
        <div class="membership-action">
          <el-button 
            type="primary" 
            size="small" 
            :plain="!membershipInfo.hasMembership || membershipInfo.daysRemaining <= 0"
            :class="{ 'vip-button': membershipInfo.hasMembership && membershipInfo.daysRemaining > 0 }"
          >
            {{ !membershipInfo.hasMembership || membershipInfo.daysRemaining <= 0 ? '立即开通' : '续费' }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- 个人信息表单 -->
    <div class="info-form-card">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        size="default"
        label-position="left"
        class="info-form"
      >
        <el-form-item label="昵称" prop="name">
          <el-input 
            v-if="isEdit" 
            v-model="ruleForm.name" 
            placeholder="请输入昵称"
            class="form-input"
          />
          <div v-else class="form-value">{{ appStore.useUserInfoStore.userInfo.name }}</div>
        </el-form-item>
        
        <el-form-item label="个性签名" prop="surname">
          <el-input 
            v-if="isEdit" 
            v-model="ruleForm.surname" 
            placeholder="请输入个性签名"
            class="form-input"
          />
          <div v-else class="form-value">{{ appStore.useUserInfoStore.userInfo.surname || '未设置个性签名' }}</div>
        </el-form-item>
        
        <el-form-item label="生日" prop="birthdaydate">
          <el-date-picker
            v-if="isEdit"
            v-model="ruleForm.birthdaydate"
            type="date"
            placeholder="请选择你的生日"
            style="width: 100%"
            class="form-input"
          />
          <div v-else class="form-value">{{ formatDateToYMD(appStore.useUserInfoStore.userInfo.birthdaydate) || '未设置生日' }}</div>
        </el-form-item>
      </el-form>

      <!-- 操作按钮 -->
      <div class="form-actions">
        <el-button v-if="!isEdit" type="primary" @click="edit" class="action-button primary-button">
          <svg-icon icon-name="icon-bianji" size="16px" color="#fff" />
          编辑信息
        </el-button>
        <div v-else class="action-buttons">
          <el-button @click="cancle" class="action-button secondary">
            取消
          </el-button>
          <el-button type="primary" :loading="submitLoading" @click="submit(ruleFormRef)" class="action-button primary-button">
            <svg-icon icon-name="icon-wancheng" size="16px" color="#fff" />
            <span>保存更改</span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { updatePersonInfoAsync } from '@/http/api/user';
  import appStore from '@/store';
  import { formatDateToYMD } from '@/utils/common';
  import { FormInstance, FormRules } from 'element-plus';
  import { storeToRefs } from 'pinia';

  interface IPerson {
    name: string;
    surname: string;
    birthdaydate: string;
  }

  // 表单填写数据
  const ruleForm = reactive<IPerson>({
    name: '',
    surname: '',
    birthdaydate: ''
  });

  const rules = reactive<FormRules>({
    name: [{ required: true, message: '昵称不能为空', trigger: 'change' }],
    surname: [{ required: true, message: '个性签名不能为空', trigger: 'change' }],
    birthdaydate: [{ required: true, message: '请选择您的生日', trigger: 'change' }]
  });

  // 获取用户信息
  const { userInfo } = storeToRefs(appStore.useUserInfoStore);

  // 获取用户会员信息
  const { membershipInfo } = storeToRefs(appStore.useMembershipStore);

  const isEdit = ref<boolean>(false);
  const edit = () => {
    ruleForm.name = appStore.useUserInfoStore.userInfo.name;
    ruleForm.surname = appStore.useUserInfoStore.userInfo.surname;
    ruleForm.birthdaydate = appStore.useUserInfoStore.userInfo.birthdaydate;
    isEdit.value = true;
  };

  // 跳转会员充值
  const router = useRouter();
  const toMembershipReach = () => {
    router.push('/membership');
  };

  // 取消更改
  const ruleFormRef = ref<FormInstance | any>();
  const cancle = () => {
    isEdit.value = false;
    ruleFormRef.value.resetFields();
  };

  // 保存更改
  const { getAndUpdateUserInfo } = appStore.useUserInfoStore;
  const submitLoading = ref<boolean>(false);
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        submitLoading.value = true;
        const data = await updatePersonInfoAsync(ruleForm);
        if (data.data.status === 200) {
          ElMessage.success('更新成功');
          isEdit.value = false;
          submitLoading.value = false;
          getAndUpdateUserInfo(); // 查询用户信息
        } else {
          ElMessage.error(data.data.message);
          submitLoading.value = false;
        }
      } else {
        submitLoading.value = false;
        console.log('error submit!', fields);
      }
    });
  };
</script>
<style lang="scss" scoped>
  .person-detail {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .membership-card {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border: 1px solid rgba(255, 215, 0, 0.2);
    border-radius: 12px;
    padding: 24px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
      transition: left 0.6s ease;
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(255, 215, 0, 0.2);

      &::before {
        left: 100%;
      }
    }

    .membership-content {
      display: flex;
      align-items: center;
      gap: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      z-index: 1;

      &:hover {
        transform: translateX(8px);
      }

      .membership-icon {
        flex-shrink: 0;
        transition: transform 0.3s ease;
        position: relative;

        &:hover {
          transform: rotate(5deg) scale(1.1);
        }

        &.vip-glow {
          animation: pulse 2s infinite;
        }

        .vip-glow-effect {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          animation: glow 2s infinite;
        }
      }

      .membership-info {
        flex: 1;

        .membership-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #333;
          transition: color 0.3s ease;
        }

        .membership-status {
          font-size: 16px;
          color: #666;
          transition: color 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 4px;

          &.active {
            color: #ffd700;
          }

          &.expired {
            color: #ff6b6b;
          }

          .vip-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-right: 8px;
            animation: slideIn 0.5s ease;

            &.active {
              background: linear-gradient(135deg, #ffd700, #ffed4e);
              color: #333;
              box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
            }

            &.lifetime {
              background: linear-gradient(135deg, #ff9500, #ffd700);
              color: #333;
              box-shadow: 0 2px 8px rgba(255, 149, 0, 0.4);
            }
          }

          .days-remaining {
            font-size: 14px;
            color: #666;
            margin-left: 8px;
          }

          .vip-desc {
            font-size: 12px;
            color: #999;
            margin-top: 4px;
          }

          .non-vip {
            font-size: 14px;
            color: #999;
          }

          .expired-status {
            font-size: 14px;
            color: #ff6b6b;
          }
        }
      }

      .membership-action {
        flex-shrink: 0;

        :deep(.el-button) {
          transition: all 0.3s ease;
          font-weight: 600;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }

          &.vip-button {
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            border-color: #ffd700;
            color: #333;
            box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);

            &:hover {
              background: linear-gradient(135deg, #ffed4e, #ffd700);
              box-shadow: 0 4px 16px rgba(255, 215, 0, 0.4);
            }
          }
        }
      }
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes glow {
    0% {
      opacity: 0.5;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 0.5;
      transform: scale(1);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .info-form-card {
    background: white;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }

    .info-form {
      .form-input {
        width: 100%;
        max-width: 400px;
        transition: all 0.3s ease;

        &:focus {
          box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
        }
      }

      .form-value {
        font-size: 14px;
        color: #333;
        padding: 0 10px;
        transition: all 0.3s ease;
        width: 100%;
        max-width: 400px;
        background: #fafafa;
        border-radius: 4px;
        border: 1px solid #e4e7ed;
        box-sizing: border-box;
        display: flex;
        height: 40px;
        align-items: center;
      }

      :deep(.el-input) {
        width: 100%;
        max-width: 400px;
      }

      :deep(.el-input__wrapper) {
        min-height: 40px;
        box-sizing: border-box;
        width: 100%;
      }

      :deep(.el-date-picker) {
        min-height: 40px;
        box-sizing: border-box;
        width: 100%;
        max-width: 400px;
      }

      :deep(.el-form-item) {
        margin-bottom: 20px;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;

        .el-form-item__label {
          font-weight: 600;
          color: #333;
          transition: color 0.3s ease;
          margin-right: 20px;
        }

        .el-form-item__content {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .el-form-item__error {
          font-size: 12px;
          color: #ff6b6b;
          transition: all 0.3s ease;
        }
      }
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #f0f0f0;

      .action-buttons {
        display: flex;
        gap: 10px;
      }

      .action-button {
        display: flex;
        align-items: center;
        gap: 12px;
        transition: all 0.3s ease;
        
        :deep(.svg-icon) {
          margin-right: 8px;
        }

        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        &.secondary {
          border-color: #e4e7ed;
          color: #606266;

          &:hover {
            border-color: #c6e2ff;
            color: #667eea;
          }
        }

        &.primary-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: #667eea;
          color: white;
          font-weight: 600;

          &:hover {
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
            border-color: #764ba2;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .membership-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;

      &:hover {
        transform: none;
      }

      .membership-action {
        width: 100%;
        text-align: right;
      }
    }

    .info-form-card {
      padding: 20px;

      .info-form {
        :deep(.el-form-item__label) {
          width: 100px;
        }

        .form-input {
          max-width: none;
        }
      }

      .form-actions {
        flex-direction: column;
        gap: 10px;

        .action-buttons {
          width: 100%;
          justify-content: space-between;

          .action-button {
            flex: 1;
            justify-content: center;
          }
        }
      }
    }
  }
</style>
