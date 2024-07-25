<template>
  <div class="person-detail-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      size="default"
      label-position="right"
    >
      <el-form-item label="会员:">
        <div v-if="!membershipInfo.hasMembership" class="not-membership-img"></div>
        <div
          v-else-if="membershipInfo.hasMembership && membershipInfo.daysRemaining > 0"
          class="content-box"
        >
          <span>剩余{{ membershipInfo.daysRemaining }}天</span>
        </div>
        <!-- 已过期 -->
        <div v-else class="content-box expiredDays">
          <span>已过期{{ membershipInfo.expiredDays }}天</span>
        </div>
      </el-form-item>
      <el-form-item label="昵称:" prop="name">
        <el-input v-if="isEdit" v-model="ruleForm.name" />
        <p v-else>{{ appStore.useUserInfoStore.userInfo.name }}</p>
      </el-form-item>
      <el-form-item label="个性签名:" prop="surname">
        <el-input v-if="isEdit" v-model="ruleForm.surname" />
        <p v-else>{{ appStore.useUserInfoStore.userInfo.surname }}</p>
      </el-form-item>
      <el-form-item label="生日:" prop="birthdaydate">
        <el-date-picker
          v-if="isEdit"
          v-model="ruleForm.birthdaydate"
          type="date"
          placeholder="请选择你的生日"
          style="width: 100%"
        />
        <p v-else>{{ formatDateToYMD(appStore.useUserInfoStore.userInfo.birthdaydate) }}</p>
      </el-form-item>
    </el-form>
    <el-divider>
      <el-icon><star-filled /></el-icon>
    </el-divider>
    <div class="button-box">
      <el-button v-if="!isEdit" type="primary" @click="edit">编辑</el-button>
      <div v-else>
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="submit(ruleFormRef)"
          >保存更改</el-button
        >
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

  // 查询用户信息
  const { getAndUpdateUserInfo } = appStore.useUserInfoStore;
  getAndUpdateUserInfo();

  // 获取用户会员信息
  const { membershipInfo } = storeToRefs(appStore.useMembershipStore);
  console.log('用户会员信息', membershipInfo.value);

  // 点击编辑
  const isEdit = ref<boolean>(false);
  const edit = () => {
    ruleForm.name = appStore.useUserInfoStore.userInfo.name;
    ruleForm.surname = appStore.useUserInfoStore.userInfo.surname;
    ruleForm.birthdaydate = appStore.useUserInfoStore.userInfo.birthdaydate;
    isEdit.value = true;
  };

  // 取消更改
  const ruleFormRef = ref<FormInstance | any>();
  const cancle = () => {
    isEdit.value = false;
    ruleFormRef.value.resetFields();
  };
  // 保存更改
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
  .person-detail-box {
    width: 100%;
    :deep(.el-form-item__label) {
      margin-right: 20px;
      font-weight: 600;
    }
    .content-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 10px;
      padding: 2px 9px;
      background-color: #83ffd1;
      border-radius: 30px;
      height: 30px;
      span {
        font-size: 12px;
        letter-spacing: 1px;
        color: #617745;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .expiredDays {
      background-color: #3b7962;
      span {
        color: rgb(237, 218, 218);
      }
    }
    .not-membership-img {
      width: 65px;
      height: 20px;
      position: relative;
      background-size: contain !important;
      cursor: pointer;
      background: url(@/assets/images/membership/not-membership.png) 100% / cover no-repeat;
      &::before {
        content: '';
        position: absolute;
        left: 6px;
        top: 1px;
        width: 59px;
        height: 16px;
        border-radius: 17px;
        background: linear-gradient(
          135deg,
          hsla(0, 0%, 100%, 0) 30%,
          hsla(0, 0%, 100%, 0.8) 50%,
          hsla(0, 0%, 100%, 0) 70%
        );
        background-size: 100px 100%;
        background-repeat: no-repeat;
        background-position: -100px top;
        animation: titleAnim 6.5s ease-in-out infinite;
      }
    }
    @keyframes titleAnim {
      0% {
        background-position: -100px top;
      }

      30%,
      100% {
        background-position: 240px top;
      }
    }
    .button-box {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
