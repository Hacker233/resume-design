<template>
  <el-dialog
    :model-value="dialogVisible"
    title="修改密码"
    width="480px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    class="modify-pass-dialog"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      size="large"
      label-position="left"
    >
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="ruleForm.email" type="email" placeholder="请输入您的邮箱" />
      </el-form-item>
      <el-form-item label="旧密码:" prop="oldPassword">
        <el-input 
          v-model="ruleForm.oldPassword" 
          :type="showOldPassword ? 'text' : 'password'"
          placeholder="请输入旧密码"
        >
          <template #suffix>
            <el-icon @click="showOldPassword = !showOldPassword" class="password-toggle">
              <component :is="showOldPassword ? 'View' : 'ViewOff'" />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newPassword">
        <el-input 
          v-model="ruleForm.newPassword" 
          :type="showNewPassword ? 'text' : 'password'"
          placeholder="请输入新密码"
        >
          <template #suffix>
            <el-icon @click="showNewPassword = !showNewPassword" class="password-toggle">
              <component :is="showNewPassword ? 'View' : 'ViewOff'" />
            </el-icon>
          </template>
        </el-input>
        <div class="password-hint">密码中必须包含字母、数字，至少8个字符</div>
      </el-form-item>
      <el-form-item label="确认密码:" prop="sureNewPassword">
        <el-input 
          v-model="ruleForm.sureNewPassword" 
          :type="showSurePassword ? 'text' : 'password'"
          placeholder="请再次输入新密码"
        >
          <template #suffix>
            <el-icon @click="showSurePassword = !showSurePassword" class="password-toggle">
              <component :is="showSurePassword ? 'View' : 'ViewOff'" />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="large" @click="cancle">取消</el-button>
        <el-button type="primary" size="large" :loading="sureLoading" @click="submit(ruleFormRef)"
          >确认修改</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { resetPasswordAsync } from '@/http/api/user';
  import appStore from '@/store';
  import { FormInstance, FormRules, ElMessage } from 'element-plus';

  const emit = defineEmits(['cancle']);
  interface TDialog {
    dialogVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    dialogVisible: false
  });

  interface IPerson {
    email: string;
    oldPassword: string;
    newPassword: string;
    sureNewPassword: string;
  }
  // 表单填写数据
  const ruleForm = reactive<IPerson>({
    email: '',
    oldPassword: '',
    newPassword: '',
    sureNewPassword: ''
  });

  // 密码显示状态
  const showOldPassword = ref(false);
  const showNewPassword = ref(false);
  const showSurePassword = ref(false);

  // 密码校验规则
  const passwordValidator = (rule: any, value: string, callback: Function) => {
    let pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
    if (!value) {
      callback(new Error('新密码不能为空'));
    } else if (!pwdRegex.test(value)) {
      callback(new Error('密码中必须包含字母、数字,至少8个字符'));
    } else {
      callback();
    }
  };
  // 确认密码的自定义规则
  const surePassValidator = (rule: any, value: string, callback: Function) => {
    if (!value) {
      callback(new Error('请再次确认密码'));
    } else if (ruleForm.newPassword !== value) {
      callback(new Error('两次输入密码不一致'));
    } else {
      callback();
    }
  };
  const rules = reactive<FormRules>({
    email: [{ required: true, message: '邮箱不能为空', trigger: 'change' }],
    oldPassword: [{ required: true, message: '旧密码不能为空', trigger: 'change' }],
    newPassword: [
      {
        required: true,
        validator: passwordValidator,
        trigger: 'change'
      }
    ],
    sureNewPassword: [{ required: true, validator: surePassValidator, trigger: 'change' }]
  });

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 确认修改
  const sureLoading = ref<boolean>(false);
  const ruleFormRef = ref<FormInstance>();
  const router = useRouter();
  const { saveUserInfo } = appStore.useUserInfoStore;
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        let params = {
          email: ruleForm.email,
          currentPassword: ruleForm.oldPassword,
          newPassword: ruleForm.newPassword
        };
        sureLoading.value = true;
        const data = await resetPasswordAsync(params);
        if (data.status === 200) {
          ElMessage.success('修改成功，请重新登录！');
          sureLoading.value = false;
          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
          saveUserInfo('');
          router.push('/');
          emit('cancle');
        } else {
          sureLoading.value = false;
          ElMessage.error(data.message);
        }
      } else {
        sureLoading.value = false;
        console.log('error submit!', fields);
      }
    });
  };
</script>
<style lang="scss" scoped>
  .modify-pass-dialog {
    .el-dialog__header {
      padding: 24px;
      border-bottom: 1px solid #f5f5f5;
      
      .el-dialog__title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }
    }
    
    .el-dialog__body {
      padding: 32px 24px;
    }
    
    .el-form {
      .el-form-item {
        margin-bottom: 24px;
        
        .el-form-item__label {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }
        
        .el-input {
          width: 100%;
          max-width: 320px;
          
          .el-input__inner {
            padding: 12px 16px;
            font-size: 15px;
            border-radius: 8px;
            border: 1px solid #e4e7ed;
            
            &:focus {
              border-color: #667eea;
              box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
            }
          }
        }
        
        .password-hint {
          margin-top: 8px;
          font-size: 12px;
          color: #999;
          line-height: 1.4;
        }
        
        .password-toggle {
          cursor: pointer;
          color: #999;
          font-size: 18px;
          transition: color 0.3s ease;
          
          &:hover {
            color: #667eea;
          }
        }
      }
    }
    
    .el-dialog__footer {
      padding: 20px 24px;
      border-top: 1px solid #f5f5f5;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      
      .el-button {
        padding: 12px 24px;
        font-size: 15px;
        font-weight: 500;
        border-radius: 8px;
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        &.el-button--primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          
          &:hover {
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          }
        }
      }
    }
  }
</style>
