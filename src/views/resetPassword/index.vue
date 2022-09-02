<template>
  <div class="reset-password-box">
    <div class="form-box" v-if="!showCountdown">
      <el-alert
        v-if="isShowError"
        title="设置密码失败,请尝试重新发送重置邮件"
        :closable="false"
        type="error"
        effect="dark"
        style="margin-bottom: 40px"
      />
      <el-form
        label-width="80px"
        ref="resetRuleFormRef"
        label-position="left"
        :model="formLabelAlign"
        :rules="registerRules"
      >
        <el-form-item label="邮箱:" prop="email">
          <el-input type="email" v-model="formLabelAlign.email" />
        </el-form-item>
        <el-form-item label="新密码:" prop="newPassword">
          <el-input type="password" v-model="formLabelAlign.newPassword" />
        </el-form-item>
        <el-form-item label="确认密码:" prop="surePassword">
          <el-input type="password" v-model="formLabelAlign.surePassword" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="reset(resetRuleFormRef)"
            class="forms_buttons-action"
            :loading="isLoading"
            >确认重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- 自动跳转至首页 -->
    <div class="auto-jump" v-else>
      <p>即将自动跳转至首页</p>
      <a href="javacript:void()" @click="toHome">点击立即跳转>></a>
      {{ countdown }}s
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { FormInstance, FormRules } from 'element-plus';
  import { resetPasswordAsync } from '@/http/api/user';

  const isLoading = ref<boolean>(false);
  const formLabelAlign = reactive({
    email: '',
    newPassword: '',
    surePassword: ''
  });
  // 确认密码的自定义规则
  const surePassValidator = (rule: any, value: string, callback: Function) => {
    if (!value) {
      callback(new Error('请再次确认密码'));
    } else if (formLabelAlign.newPassword !== value) {
      callback(new Error('两次输入密码不一致'));
    } else {
      callback();
    }
  };
  // 密码校验规则
  const passwordValidator = (rule: any, value: string, callback: Function) => {
    let pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
    if (!value) {
      callback(new Error('密码不能为空'));
    } else if (!pwdRegex.test(value)) {
      callback(new Error('密码中必须包含字母、数字,至少8个字符'));
    } else {
      callback();
    }
  };
  const registerRules = reactive<FormRules>({
    email: [{ required: true, message: '请输入邮箱', trigger: 'change' }],
    newPassword: [
      {
        required: true,
        validator: passwordValidator,
        trigger: 'change'
      }
    ],
    surePassword: [{ required: true, validator: surePassValidator, trigger: 'change' }]
  });

  // 重置密码
  let timer = ref<any>(null);
  const countdown = ref<number>(15);
  const showCountdown = ref<boolean>(false);
  const route = useRoute();
  const router = useRouter();
  const isShowError = ref<boolean>(false);
  const resetRuleFormRef = ref<FormInstance>();
  const reset = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        isShowError.value = false;
        const newPasswordToken = route.query.newPasswordToken;
        if (!newPasswordToken) {
          ElMessage({
            message: '您当前浏览地址非邮件中的链接地址',
            type: 'error'
          });
          return;
        }
        isLoading.value = true;
        let params = {
          email: formLabelAlign.email,
          newPassword: formLabelAlign.newPassword,
          newPasswordToken: newPasswordToken
        };
        const data = await resetPasswordAsync(params);
        if (data.status === 200) {
          isLoading.value = false;
          isShowError.value = false;
          showCountdown.value = true;
          ElMessage({
            message: '重置密码成功',
            type: 'success'
          });
          // 开启自动跳转定时器
          timer = setInterval(() => {
            if (countdown.value > 0) {
              countdown.value--;
            } else {
              clearInterval(timer);
              router.push('/');
            }
          }, 1000);
        } else {
          isLoading.value = false;
          ElMessage({
            message: data.message,
            type: 'error'
          });
          isShowError.value = true;
        }
      } else {
        console.log('error submit!', fields);
      }
    });
  };
  // 跳转至首页
  const toHome = () => {
    router.push('/');
  };

  // 销毁前
  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
</script>
<style lang="scss" scoped>
  .reset-password-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    flex-direction: column;
    .form-box {
      width: 350px;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: rgba(99, 100, 99, 0.2) 0px 0px 10px;
      padding: 40px 30px;
      box-sizing: border-box;
    }
    :deep(.el-alert__content) {
      display: flex;
      align-items: center;
      height: 20px;
      .el-alert__title {
        line-height: 0;
      }
    }
    .auto-jump {
      display: flex;
      font-size: 16px;
    }
  }
</style>
