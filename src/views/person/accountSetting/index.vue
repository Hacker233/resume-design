<template>
  <div class="account-setting">
    <div class="setting-card">
      <div class="setting-item">
        <div class="item-label">
          <span class="label-text">邮箱</span>
          <span class="label-desc">用于登录和找回密码</span>
        </div>
        <div class="item-content">
          <span class="content-value">{{ form.email }}</span>
          <el-tag v-if="form.auth.email.valid" type="success" class="status-tag" effect="light">
            已验证
          </el-tag>
          <el-tag v-else type="warning" class="status-tag" effect="light"> 未验证 </el-tag>
        </div>
      </div>
      <div class="setting-item">
        <div class="item-label">
          <span class="label-text">密码</span>
          <span class="label-desc">定期修改密码保障账户安全</span>
        </div>
        <div class="item-content">
          <span class="content-value">********</span>
          <el-button size="default" @click="handleModify" class="action-button">
            <svg-icon icon-name="icon-shezhi" size="16px" />
            修改密码
          </el-button>
        </div>
      </div>
    </div>

    <!-- 修改密码弹窗 -->
    <modify-pass-dialog-vue :dialog-visible="dialogVisible" @cancle="cancle"></modify-pass-dialog-vue>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import appStore from '@/store';
  import ModifyPassDialogVue from './components/ModifyPassDialog.vue';

  const form = reactive(appStore.useUserInfoStore.userInfo);

  // 修改密码弹窗
  const dialogVisible = ref<boolean>(false);
  const handleModify = () => {
    dialogVisible.value = true;
  };
  const cancle = () => {
    dialogVisible.value = false;
  };
</script>

<style lang="scss" scoped>
  .account-setting {
    padding: 20px;
    
    .setting-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      border: 1px solid #f0f0f0;
      overflow: hidden;
      
      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        border-bottom: 1px solid #f5f5f5;
        
        &:last-child {
          border-bottom: none;
        }
        
        .item-label {
          display: flex;
          flex-direction: column;
          gap: 4px;
          
          .label-text {
            font-size: 16px;
            font-weight: 600;
            color: #333;
          }
          
          .label-desc {
            font-size: 14px;
            color: #999;
          }
        }
        
        .item-content {
          display: flex;
          align-items: center;
          gap: 16px;
          
          .content-value {
            font-size: 15px;
            color: #666;
            font-weight: 500;
          }
          
          .status-tag {
            font-size: 12px;
            padding: 4px 12px;
            border-radius: 12px;
          }
          
          .action-button {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 12px 14px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 8px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            color: white !important;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
            min-width: 100px;
            justify-content: center;
            
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
              background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
            }
            
            &:active {
              transform: translateY(0);
              box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
            }
            
            :deep(.svg-icon) {
              color: white !important;
              font-size: 18px;
              margin-right: 4px;
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .account-setting {
      padding: 16px;
      
      .setting-card {
        .setting-item {
          padding: 16px 20px;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          
          .item-content {
            width: 100%;
            justify-content: space-between;
          }
        }
      }
    }
  }
</style>
