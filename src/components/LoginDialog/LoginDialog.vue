<template>
  <el-dialog
    :model-value="show"
    width="768px"
    :show-close="false"
    :before-close="handleClose"
    class="login-dialog-box"
  >
    <div class="login-dialog-form-box">
      <!-- 关闭按钮 -->
      <div class="close-loding-dialog-box" @click="handleClose">
        <svg-icon icon-name="icon-guanbi2" color="#ccc" size="18px"></svg-icon>
      </div>
      <div :class="['container', { 'right-panel-active': isSignUp }]">
        <div class="form-container sign-up-container">
          <h1>创建账号</h1>
          <div class="social-container"> </div>
          <el-form
            ref="registerRuleFormRef"
            class="forms_form"
            :model="registerForm"
            size="small"
            :rules="registerRules"
          >
            <!-- 昵称 -->
            <el-form-item prop="name">
              <el-input
                v-model="registerForm.name"
                type="text"
                maxlength="16"
                class="forms_field-input"
                placeholder="昵称"
                @keyup.enter="register(registerRuleFormRef)"
              />
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item prop="email">
              <el-input
                v-model="registerForm.email"
                type="email"
                class="forms_field-input"
                maxlength="40"
                placeholder="电子邮箱"
                @keyup.enter="register(registerRuleFormRef)"
              />
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                v-model="registerForm.password"
                type="password"
                class="forms_field-input"
                placeholder="密码"
                @keyup.enter="register(registerRuleFormRef)"
              />
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item prop="surePassword">
              <el-input
                v-model="registerForm.surePassword"
                type="password"
                class="forms_field-input"
                placeholder="确认密码"
                @keyup.enter="register(registerRuleFormRef)"
              />
            </el-form-item>
            <!-- 邮箱验证码 -->
            <el-form-item prop="verificationCode">
              <div class="email-code-box">
                <el-input
                  v-model="registerForm.verificationCode"
                  class="forms_field-input"
                  placeholder="请输入验证码"
                  @keyup.enter="register(registerRuleFormRef)"
                />
                <el-button
                  :disabled="!isEmail || isDisabled"
                  class="get-email-code"
                  size="small"
                  type="primary"
                  @click.stop="getEmailCode"
                >
                  {{ isDisabled ? `${countdown}s 后重试` : '获取验证码' }}</el-button
                >
              </div>
            </el-form-item>
            <!-- 注册邀请码 -->
            <el-form-item v-if="websiteConfig.open_invite_register">
              <el-input
                v-model.trim="registerForm.inviteCode"
                class="forms_field-input"
                placeholder="邀请码（非必填）"
                @keyup.enter="register(registerRuleFormRef)"
              />
            </el-form-item>
            <!-- 隐私协议、服务条款 -->
            <el-form-item>
              <div
                class="private-service-box"
                :class="{ 'agree-text-active': selectedPrivateService }"
              >
                <el-checkbox
                  v-model="selectedPrivateService"
                  class="agree-checkbox"
                  style="margin-right: 5px"
                />
                <span class="agreement-text">
                  我已阅读并同意
                  <a href="#" @click.stop="toPrivacy">隐私协议</a> 和
                  <a href="#" @click.stop="toService">服务条款</a>
                </span>
              </div>
            </el-form-item>
          </el-form>
          <el-button
            class="ghost-button forms_buttons-action"
            :loading="isRegisterLoading"
            @click="register(registerRuleFormRef)"
            >注 册</el-button
          >
        </div>
        <!-- 登录界面 -->
        <div class="form-container sign-in-container">
          <!-- 普通用户登录 -->
          <template v-if="loginMode === 'regular'">
            <h1>登录</h1>
            <div class="social-container"> </div>
            <el-form
              ref="loginRuleFormRef"
              class="forms_form"
              size="small"
              :model="loginForm"
              :rules="loginRules"
            >
              <el-form-item prop="email">
                <el-input
                  v-model="loginForm.email"
                  type="email"
                  class="forms_field-input"
                  maxlength="40"
                  placeholder="电子邮箱"
                  @keyup.enter="login(loginRuleFormRef)"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="loginForm.password"
                  type="password"
                  class="forms_field-input"
                  placeholder="密码"
                  @keyup.enter="login(loginRuleFormRef)"
                />
              </el-form-item>
            </el-form>
            <a href="#" @click.prevent="forgetPassword">忘记密码？</a>
            <el-button
              class="ghost-button forms_buttons-action"
              :loading="isLoginLoading"
              @click="login(loginRuleFormRef)"
              >登 录</el-button
            >
          </template>
          <!-- 企业、组织、学校用户登录 -->
          <template v-if="loginMode === 'company'">
            <h1>组织用户登录</h1>
            <div class="social-container"> </div>
            <el-form
              ref="companyLoginFormRef"
              class="forms_form"
              size="small"
              :model="companyLoginForm"
              :rules="companyLoginRules"
            >
              <el-form-item prop="email">
                <el-input
                  v-model="companyLoginForm.email"
                  type="email"
                  class="forms_field-input"
                  maxlength="40"
                  placeholder="账号"
                  @keyup.enter="companyLogin(companyLoginFormRef)"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="companyLoginForm.password"
                  type="password"
                  class="forms_field-input"
                  placeholder="密码"
                  @keyup.enter="companyLogin(companyLoginFormRef)"
                />
              </el-form-item>
            </el-form>
            <el-button
              class="ghost-button forms_buttons-action"
              :loading="isLoginLoading"
              @click="companyLogin(companyLoginFormRef)"
              >登 录</el-button
            >
          </template>
          <!-- 其它登录方式 -->
          <div class="other-login-box">
            <el-divider> 其它登录方式 </el-divider>
            <div class="other-login-icon-box">
              <el-tooltip
                :content="loginMode === 'regular' ? '企业/组织/学校用户登录' : '普通用户登录'"
              >
                <div v-if="loginMode === 'regular'" class="icon-box" @click="loginByCompany">
                  <svg-icon icon-name="icon-qiye" color="#a3abb1" size="30px"></svg-icon>
                </div>
                <div v-if="loginMode === 'company'" class="icon-box" @click="loginByRegular">
                  <svg-icon icon-name="icon-renwu-ren" color="#a3abb1" size="20px"></svg-icon>
                </div>
              </el-tooltip>
            </div>
          </div>
        </div>
        <!-- 注册登录浮窗切换 -->
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>欢迎回来！</h1>
              <p>已有帐号，立即登录！</p>
              <button class="ghost-button ghost" @click="signIn">立即登录</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>你好, 猫友！</h1>
              <p v-if="websiteConfig.open_sign">还没有账号？快来注册吧！</p>
              <button v-if="websiteConfig.open_sign" class="ghost-button ghost" @click="signUp"
                >立即注册</button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
  <!-- 隐私协议弹窗 -->
  <private-service-dialog v-model="privateServiceVisiable" :type="type"></private-service-dialog>
</template>
<script lang="ts" setup>
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import { companyLoginAsync, loginAsync, registerAsync, sendCodeAsync } from '@/http/api/user';
  import appStore from '@/store';
  import PrivateServiceDialog from './components/PrivateServiceDialog.vue';
  const props = defineProps({
    isLogin: {
      type: Boolean,
      default: false
    },
    cancle: {
      type: Function,
      default: (fun: any) => fun()
    },
    confirm: {
      type: Function,
      default: (fun: any) => fun()
    }
  });

  const selectedPrivateService = ref<boolean>(false);
  const privateServiceVisiable = ref<boolean>(false);
  const type = ref<'privacy' | 'service' | ''>(''); // 切换登录注册
  // 打开隐私协议
  const toPrivacy = () => {
    type.value = 'privacy';
    privateServiceVisiable.value = true;
  };
  // 打开服务条款
  const toService = () => {
    type.value = 'service';
    privateServiceVisiable.value = true;
  };

  const { websiteConfig } = appStore.useWebsiteConfigStore;
  // 登录数据
  interface IForm {
    email: string;
    password: string;
  }

  // 邮箱自定义校验规则
  const emailValidator = (rule: any, value: string, callback: Function) => {
    if (!value) {
      callback(new Error('邮箱不能为空'));
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(value)) {
        callback();
      } else {
        callback(new Error('邮件格式错误'));
      }
    }
  };

  // 确认密码的自定义规则
  const surePassValidator = (rule: any, value: string, callback: Function) => {
    if (!value) {
      callback(new Error('请再次确认密码'));
    } else if (registerForm.password !== value) {
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

  const loginForm = reactive<IForm>({
    email: '',
    password: ''
  });
  const loginRules = reactive<FormRules>({
    email: [{ required: true, validator: emailValidator, trigger: 'change' }],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'change'
      }
    ]
  });

  // 组织登录表单数据
  interface ICompanyLoginForm {
    email: string;
    password: string;
  }
  const companyLoginForm = reactive<ICompanyLoginForm>({
    email: '', // 注册邮箱
    password: '' // 密码
  });

  const companyLoginRules = reactive<FormRules>({
    email: [{ required: true, message: '请输入账号', trigger: 'change' }],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'change'
      }
    ]
  });

  // 注册表单数据
  interface IRegisterForm {
    name: string;
    email: string;
    password: string;
    surePassword: string;
    verificationCode: string;
    inviteCode: string;
  }
  const registerForm = reactive<IRegisterForm>({
    name: '', // 昵称
    email: '', // 注册邮箱
    password: '', // 密码
    surePassword: '', // 确认密码
    verificationCode: '', // 邮箱验证码
    inviteCode: '' // 邀请码
  });
  const registerRules = reactive<FormRules>({
    name: [{ required: true, message: '请输入用户名', trigger: 'change' }],
    email: [{ required: true, validator: emailValidator, trigger: 'change' }],
    password: [
      {
        required: true,
        validator: passwordValidator,
        trigger: 'change'
      }
    ],
    surePassword: [{ required: true, validator: surePassValidator, trigger: 'change' }],
    verificationCode: [{ required: true, message: '邮箱验证码不能为空', trigger: 'change' }]
  });

  const show = ref<boolean>(true);

  const isEmail = computed(() => {
    return registerForm.email ? true : false;
  });

  // 是否已经点过获取验证码了
  const isDisabled = ref<boolean>(false);
  const countdown = ref<number>(0); // 倒计时时间
  let timer: number | null = null; // 定时器
  // 获取验证码
  const getEmailCode = async () => {
    if (isDisabled.value) return; // 如果按钮已经禁用，直接返回
    let params = {
      email: registerForm.email
    };
    const data = await sendCodeAsync(params);
    if (data.status === 200) {
      ElMessage.success('验证码发送成功，请前往邮箱查看！');
      // 点击后禁用按钮并开始倒计时
      isDisabled.value = true;
      countdown.value = 60;

      timer = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--;
        } else {
          // 倒计时结束，重置按钮
          isDisabled.value = false;
          if (timer) clearInterval(timer);
        }
      }, 1000);
    } else {
      ElMessage.error(data.message);
    }
  };

  // 取消登录
  const handleClose = () => {
    show.value = false;
    props.cancle();
  };

  // 登录
  const { setUuid } = appStore.useRefreshStore;
  const { saveToken } = appStore.useTokenStore;
  const { saveUserInfo } = appStore.useUserInfoStore;
  const { getUserIntegralTotal } = appStore.useUserInfoStore;
  const isLoginLoading = ref<boolean>(false);
  const router = useRouter();
  const loginRuleFormRef = ref<FormInstance>();
  const login = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        isLoginLoading.value = true;
        const data = await loginAsync(loginForm);
        if (data.status === 200) {
          isLoginLoading.value = false;
          setUuid(); // 无感刷新页面
          saveToken('Bearer ' + data.data.token.access_token); // 存储token到本地
          saveUserInfo(data.data.user); // 存储用户信息
          getUserIntegralTotal(); // 查询简币信息
          ElMessage({
            message: '登录成功',
            type: 'success'
          });
          show.value = false;
          // 查询和更新用户信息
          const { getAndUpdateUserInfo } = appStore.useUserInfoStore;
          getAndUpdateUserInfo();
          props.confirm();
        } else {
          isLoginLoading.value = false;
          ElMessage({
            message: data.message,
            type: 'error'
          });
        }
      } else {
        console.log('error submit!', fields);
      }
    });
  };

  // 注册
  const registerRuleFormRef = ref<FormInstance>();
  const isRegisterLoading = ref<boolean>(false);
  const register = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        // 判断是否勾选隐私协议
        if (!selectedPrivateService.value) {
          ElMessage({
            message: '请勾选隐私协议和服务条款！',
            type: 'error'
          });
          return;
        }
        isRegisterLoading.value = true;
        let params = {
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
          verificationCode: registerForm.verificationCode,
          inviteCode: registerForm.inviteCode
        };
        const data = await registerAsync(params);
        if (data.status === 200) {
          isRegisterLoading.value = false;
          isSignUp.value = false;
          ElMessage({
            message: '注册成功',
            type: 'success'
          });
        } else {
          isRegisterLoading.value = false;
          ElMessage({
            message: data.message,
            type: 'error'
          });
        }
      } else {
        console.log('error submit!', fields);
      }
    });
  };

  // 忘记密码
  const forgetPassword = async () => {
    router.push('/forgetPassword');
    show.value = false;
    props.confirm();
  };

  const isSignUp = ref<boolean>(!props.isLogin);
  // 点击去注册
  const signUp = () => {
    isSignUp.value = true;
  };
  // 点击去登录
  const signIn = () => {
    isSignUp.value = false;
  };

  // qq登录
  // const toQQLogin = () => {
  //   window.open(
  //     'oauth/index.php',
  //     'TencentLogin',
  //     'width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1'
  //   );
  // };

  // 清除定时器以避免内存泄漏
  onUnmounted(() => {
    if (timer) clearInterval(timer);
  });

  // 登录模式
  const loginMode = ref<string>('regular');

  // 切换企业登录
  const loginByCompany = () => {
    loginMode.value = 'company';
  };

  // 切换普通用户登录
  const loginByRegular = () => {
    loginMode.value = 'regular';
  };

  // 企业用户登录
  const companyLoginFormRef = ref<FormInstance>();
  const companyLogin = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        isLoginLoading.value = true;
        const data = await companyLoginAsync(companyLoginForm);
        if (data.status === 200) {
          isLoginLoading.value = false;
          setUuid(); // 无感刷新页面
          saveToken('Bearer ' + data.data.token.access_token); // 存储token到本地
          saveUserInfo(data.data.user); // 存储用户信息
          getUserIntegralTotal(); // 查询简币信息
          ElMessage({
            message: '登录成功',
            type: 'success'
          });
          show.value = false;
          // 查询和更新用户信息
          const { getAndUpdateUserInfo } = appStore.useUserInfoStore;
          getAndUpdateUserInfo();
          props.confirm();
        } else {
          isLoginLoading.value = false;
          ElMessage({
            message: data.message,
            type: 'error'
          });
        }
      } else {
        console.log('error submit!', fields);
      }
    });
  };
</script>
<style lang="scss" scoped>
  .login-dialog-form-box {
    position: relative;
    .close-loding-dialog-box {
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 999;
      cursor: pointer;
    }
    h1 {
      font-weight: bold;
      margin: 0;
    }

    h2 {
      text-align: center;
    }

    p {
      font-size: 14px;
      font-weight: 100;
      line-height: 20px;
      letter-spacing: 0.5px;
      margin: 20px 0 30px;
    }

    span {
      font-size: 12px;
    }

    a {
      color: #333;
      font-size: 14px;
      text-decoration: none;
      margin: 0 0 15px 0;
    }

    .ghost-button {
      border-radius: 20px;
      border: 1px solid #00c091;
      background-color: #00c091;
      color: #ffffff;
      font-size: 12px;
      font-weight: bold;
      padding: 18px 45px;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: transform 80ms ease-in;
      cursor: pointer;
    }

    .ghost-button:active {
      transform: scale(0.95);
    }

    .ghost-button:focus {
      outline: none;
    }

    .ghost-button.ghost {
      background-color: transparent;
      border-color: #ffffff;
      cursor: pointer;
      padding: 12px 45px;
    }
    .email-code-box {
      display: flex;
      height: 48px;
      align-items: center;
      .get-email-code {
        height: 40px;
        display: flex;
        padding: 0;
        width: 150px;
        margin-left: 10px;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        letter-spacing: 1px;
      }
    }

    .container {
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
      position: relative;
      overflow: hidden;
      width: 768px;
      max-width: 100%;
      min-height: 550px;
    }

    .form-container {
      position: absolute;
      top: 0;
      height: 100%;
      transition: all 0.6s ease-in-out;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 50px;
      :deep(.forms_form) {
        width: 100%;
        input {
          border: none;
          padding: 10px 12px;
          margin: 8px 0;
          width: 100%;
          font-size: 14px;
          color: #333;
        }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
        }
        .el-form-item {
          margin-bottom: 20px;
        }
        .el-input__inner {
          background-color: none !important;
        }
      }
    }

    .sign-in-container {
      left: 0;
      width: 50%;
      z-index: 2;
    }

    .container.right-panel-active .sign-in-container {
      transform: translateX(100%);
    }

    .sign-up-container {
      left: 0;
      width: 50%;
      opacity: 0;
      z-index: 1;
    }

    .container.right-panel-active .sign-up-container {
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
      animation: show 0.6s;
      background-color: #fff;
    }

    @keyframes show {
      0%,
      49.99% {
        opacity: 0;
        z-index: 1;
      }

      50%,
      100% {
        opacity: 1;
        z-index: 5;
      }
    }

    .overlay-container {
      position: absolute;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: transform 0.6s ease-in-out;
      z-index: 100;
    }

    .container.right-panel-active .overlay-container {
      transform: translateX(-100%);
    }

    .overlay {
      background: #b0db7d;
      background: linear-gradient(to bottom right, #73b722 40%, #9dc6ae 100%);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 0 0;
      color: #ffffff;
      position: relative;
      left: -100%;
      height: 100%;
      width: 200%;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
    }

    .container.right-panel-active .overlay {
      transform: translateX(50%);
    }

    .overlay-panel {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 40px;
      text-align: center;
      top: 0;
      height: 100%;
      width: 50%;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
    }

    .overlay-left {
      transform: translateX(-20%);
    }

    .container.right-panel-active .overlay-left {
      transform: translateX(0);
    }

    .overlay-right {
      right: 0;
      transform: translateX(0);
    }

    .container.right-panel-active .overlay-right {
      transform: translateX(20%);
    }

    .social-container {
      margin: 20px 0;
    }

    .social-container a {
      border: 1px solid #dddddd;
      border-radius: 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin: 0 5px;
      height: 40px;
      width: 40px;
      cursor: pointer;
      &:hover {
        color: #ff4b2b;
      }
    }

    .other-login-box {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
      :deep(.el-divider__text) {
        color: #333;
        font-size: 12px;
      }
      .other-login-icon-box {
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-box {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          border: 1px solid #dedcdc;
          &:hover {
            background-color: rgba(#eceeeca5, 0.7);
          }
        }
      }
    }

    :deep(.private-service-box) {
      opacity: 0.5;
      .agreement-text {
        transition: color 0.3s;
        cursor: pointer;
        a {
          color: rgb(103, 103, 217);
        }
      }
    }
    .agree-text-active {
      opacity: 1;
    }
  }
</style>
<style lang="scss">
  .login-dialog-box {
    border-radius: 12px;
    .el-dialog__header {
      display: none !important;
    }
    .el-dialog__body {
      padding: 0 !important;
      min-height: 500px;
    }
  }
</style>
