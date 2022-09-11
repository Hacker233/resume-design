<template>
  <el-dialog
    :model-value="show"
    width="750px"
    :show-close="false"
    :close-on-click-modal="false"
    :before-close="handleClose"
    custom-class="login-dialog-box"
  >
    <section class="user">
      <div class="user_options-container">
        <div class="user_options-text">
          <div class="user_options-unregistered">
            <h2 class="user_unregistered-title">还没有账号？</h2>
            <p class="user_unregistered-text">为了方便数据存储，赶紧来注册一个吧~</p>
            <button class="user_unregistered-signup" @click="toRegister">去注册</button>
          </div>

          <div class="user_options-registered">
            <h2 class="user_registered-title">已经有帐号了</h2>
            <p class="user_registered-text">赶紧试试登录吧~</p>
            <button class="user_registered-login" @click="toLogin">登 录</button>
          </div>
        </div>

        <div :class="['user_options-forms', { bounceRight: bounceRight, bounceLeft: bounceLeft }]">
          <div class="user_forms-login">
            <h2 class="forms_title">登录</h2>
            <el-form
              ref="loginRuleFormRef"
              class="forms_form"
              :model="loginForm"
              :rules="loginRules"
            >
              <fieldset class="forms_fieldset">
                <div class="forms_field">
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
                </div>
                <div class="forms_field">
                  <el-form-item prop="password">
                    <el-input
                      v-model="loginForm.password"
                      type="password"
                      class="forms_field-input"
                      placeholder="密码"
                      @keyup.enter="login(loginRuleFormRef)"
                    />
                  </el-form-item>
                </div>
              </fieldset>
              <div class="forms_buttons">
                <button type="button" class="forms_buttons-forgot" @click="forgetPassword"
                  >忘记密码？</button
                >
                <el-button
                  class="forms_buttons-action"
                  :loading="isLoginLoading"
                  @click="login(loginRuleFormRef)"
                  >登 录</el-button
                >
              </div>
            </el-form>
          </div>
          <div class="user_forms-signup">
            <h2 class="forms_title">注册</h2>
            <el-form
              ref="registerRuleFormRef"
              class="forms_form"
              :model="registerForm"
              :rules="registerRules"
            >
              <fieldset class="forms_fieldset">
                <div class="forms_field">
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
                </div>
                <div class="forms_field">
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
                </div>
                <div class="forms_field">
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
                </div>
                <div class="forms_field">
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
                </div>
              </fieldset>
              <div class="forms_buttons">
                <el-button
                  class="forms_buttons-action"
                  :loading="isRegisterLoading"
                  @click="register(registerRuleFormRef)"
                  >注 册</el-button
                >
              </div>
            </el-form>
          </div>
        </div>
      </div>

      <!-- 关闭按钮 -->
      <div class="close" @click="handleClose">
        <svg-icon icon-name="icon-guanbi" color="#eee" size="40px"></svg-icon>
      </div>
    </section>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import { loginAsync, registerAsync } from '@/http/api/user';
  import appStore from '@/store';
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

  // 登录数据
  interface IForm {
    email: string;
    password: string;
  }
  const loginForm = reactive<IForm>({
    email: '',
    password: ''
  });
  const loginRules = reactive<FormRules>({
    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'change'
      }
    ]
  });

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

  // 注册表单数据
  interface IRegisterForm {
    name: string;
    email: string;
    password: string;
    surePassword: string;
  }
  const registerForm = reactive<IRegisterForm>({
    name: '',
    email: '',
    password: '',
    surePassword: ''
  });
  const registerRules = reactive<FormRules>({
    name: [{ required: true, message: '请输入用户名', trigger: 'change' }],
    email: [{ required: true, message: '请输入邮箱', trigger: 'change' }],
    password: [
      {
        required: true,
        validator: passwordValidator,
        trigger: 'change'
      }
    ],
    surePassword: [{ required: true, validator: surePassValidator, trigger: 'change' }]
  });

  // 点击去注册
  const bounceRight = ref<boolean>(props.isLogin);
  const bounceLeft = ref<boolean>(!props.isLogin);
  const toRegister = () => {
    bounceRight.value = false;
    bounceLeft.value = true;
  };
  const toLogin = () => {
    bounceRight.value = true;
    bounceLeft.value = false;
  };

  const show = ref<boolean>(true);

  // 取消登录
  const handleClose = () => {
    show.value = false;
    props.cancle();
  };

  // 登录
  const { setUuid } = appStore.useRefreshStore;
  const { saveToken } = appStore.useTokenStore;
  const { saveUserInfo } = appStore.useUserInfoStore;
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
          let emailVerify = data.data.user.auth.email.valid;
          setUuid(); // 无感刷新页面
          saveToken('Bearer ' + data.data.token.access_token); // 存储token到本地
          saveUserInfo(data.data.user); // 存储用户信息
          if (emailVerify) {
            ElMessage({
              message: '登录成功',
              type: 'success'
            });
            show.value = false;
            props.confirm();
          } else {
            ElMessage({
              message: '请验证您的电子邮箱',
              type: 'error'
            });
            // 跳转到邮箱验证页
            router.push({
              path: '/emailVerify',
              query: {
                email: loginForm.email
              }
            });
            show.value = false;
          }
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
        isRegisterLoading.value = true;
        let params = {
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password
        };
        const data = await registerAsync(params);
        if (data.status === 200) {
          isRegisterLoading.value = false;
          bounceRight.value = true;
          bounceLeft.value = false; // 注册成功前去登录
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
</script>
<style lang="scss" scoped>
  button {
    background-color: transparent;
    padding: 0;
    border: 0;
    outline: 0;
    cursor: pointer;
  }

  input {
    background-color: transparent;
    padding: 0;
    border: 0;
    outline: 0;
  }
  input[type='submit'] {
    cursor: pointer;
  }
  input::-moz-placeholder {
    font-size: 0.85rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    letter-spacing: 0.1rem;
    color: #ccc;
  }
  input:-ms-input-placeholder {
    font-size: 0.85rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    letter-spacing: 0.1rem;
    color: #ccc;
  }
  input::placeholder {
    font-size: 0.85rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    letter-spacing: 0.1rem;
    color: #ccc;
  }

  /**
 * * Bounce to the left side
 * */
  @-webkit-keyframes bounceLeft {
    0% {
      transform: translate3d(100%, -50%, 0);
    }
    50% {
      transform: translate3d(-30px, -50%, 0);
    }
    100% {
      transform: translate3d(0, -50%, 0);
    }
  }
  @keyframes bounceLeft {
    0% {
      transform: translate3d(100%, -50%, 0);
    }
    50% {
      transform: translate3d(-30px, -50%, 0);
    }
    100% {
      transform: translate3d(0, -50%, 0);
    }
  }
  /**
 * * Bounce to the left side
 * */
  @-webkit-keyframes bounceRight {
    0% {
      transform: translate3d(0, -50%, 0);
    }
    50% {
      transform: translate3d(calc(100% + 30px), -50%, 0);
    }
    100% {
      transform: translate3d(100%, -50%, 0);
    }
  }
  @keyframes bounceRight {
    0% {
      transform: translate3d(0, -50%, 0);
    }
    50% {
      transform: translate3d(calc(100% + 30px), -50%, 0);
    }
    100% {
      transform: translate3d(100%, -50%, 0);
    }
  }
  /**
 * * Show Sign Up form
 * */
  @-webkit-keyframes showSignUp {
    100% {
      opacity: 1;
      visibility: visible;
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes showSignUp {
    100% {
      opacity: 1;
      visibility: visible;
      transform: translate3d(0, 0, 0);
    }
  }
  /**
 * * Page background
 * */
  .user {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-size: cover;
    position: relative;
  }
  .user_options-container {
    position: relative;
    width: 100%;
  }
  .user_options-text {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 380px;
    background-color: rgba(34, 34, 34, 0.85);
    border-radius: 3px;
  }

  /**
 * * Registered and Unregistered user box and text
 * */
  .user_options-registered,
  .user_options-unregistered {
    width: 50%;
    padding: 100px 45px;
    color: #fff;
    font-weight: 300;
  }

  .user_registered-title,
  .user_unregistered-title {
    margin-bottom: 15px;
    font-size: 1.66rem;
    line-height: 1em;
  }

  .user_unregistered-text,
  .user_registered-text {
    font-size: 0.83rem;
    line-height: 1.4em;
  }

  .user_registered-login,
  .user_unregistered-signup {
    margin-top: 30px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 10px 30px;
    color: #fff;
    text-transform: uppercase;
    line-height: 1em;
    letter-spacing: 0.2rem;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }
  .user_registered-login:hover,
  .user_unregistered-signup:hover {
    color: rgba(34, 34, 34, 0.85);
    background-color: #ccc;
  }

  /**
 * * Login and signup forms
 * */
  .user_options-forms {
    position: absolute;
    top: 50%;
    left: 30px;
    width: calc(50% - 30px);
    min-height: 420px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    transform: translate3d(100%, -50%, 0);
    transition: transform 0.4s ease-in-out;
  }
  .user_options-forms .user_forms-login {
    transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
  }
  .user_options-forms .forms_title {
    margin-bottom: 45px;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1em;
    text-transform: uppercase;
    color: #e8716d;
    letter-spacing: 0.1rem;
  }
  .forms_field {
    user-select: none;
  }
  .user_options-forms .forms_field:not(:last-of-type) {
    margin-bottom: 20px;
  }
  .user_options-forms .forms_field-input {
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding: 6px 20px 6px 6px;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    color: gray;
    letter-spacing: 0.1rem;
    transition: border-color 0.2s ease-in-out;
  }
  .user_options-forms .forms_field-input:focus {
    border-color: gray;
  }
  .user_options-forms .forms_buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 35px;
  }
  .user_options-forms .forms_buttons-forgot {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.1rem;
    color: #ccc;
    text-decoration: underline;
    transition: color 0.2s ease-in-out;
  }
  .user_options-forms .forms_buttons-forgot:hover {
    color: #b3b3b3;
  }
  .user_options-forms .forms_buttons-action {
    background-color: #e8716d;
    border-radius: 3px;
    padding: 20px 35px;
    font-size: 1rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
  }
  .user_options-forms .forms_buttons-action:hover {
    background-color: #e14641;
  }
  .user_options-forms .user_forms-signup,
  .user_options-forms .user_forms-login {
    position: absolute;
    top: 0;
    left: 40px;
    width: calc(100% - 80px);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, transform 0.5s ease-in-out;
  }
  .user_options-forms .user_forms-signup {
    transform: translate3d(120px, 0, 0);
  }
  .user_options-forms .user_forms-signup .forms_buttons {
    justify-content: flex-end;
  }
  .user_options-forms .user_forms-login {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    visibility: visible;
  }

  /**
 * * Triggers
 * */
  .user_options-forms.bounceLeft {
    -webkit-animation: bounceLeft 1s forwards;
    animation: bounceLeft 1s forwards;
  }
  .user_options-forms.bounceLeft .user_forms-signup {
    -webkit-animation: showSignUp 1s forwards;
    animation: showSignUp 1s forwards;
  }
  .user_options-forms.bounceLeft .user_forms-login {
    opacity: 0;
    visibility: hidden;
    transform: translate3d(-120px, 0, 0);
  }
  .user_options-forms.bounceRight {
    -webkit-animation: bounceRight 1s forwards;
    animation: bounceRight 1s forwards;
  }

  /**
 * * Responsive 990px
 * */
  @media screen and (max-width: 990px) {
    .user_options-forms {
      min-height: 350px;
    }
    .user_options-forms .forms_buttons {
      flex-direction: column;
    }
    .user_options-forms .user_forms-login .forms_buttons-action {
      margin-top: 30px;
    }
    .user_options-forms .user_forms-signup,
    .user_options-forms .user_forms-login {
      top: 40px;
    }

    .user_options-registered,
    .user_options-unregistered {
      padding: 50px 45px;
    }
  }

  .close {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    right: -60px;
    top: -100px;
    transition: all 0.3s;
    &:hover {
      opacity: 0.7;
    }
  }
</style>
<style lang="scss">
  .el-dialog {
    border-radius: 4px;
  }
  .login-dialog-box {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
    }
    // 表单
    .el-input__wrapper {
      border: none !important;
      padding: 0 !important;
      box-shadow: none !important;
    }
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
  }
  input:-webkit-autofill {
    -webkit-text-fill-color: gray !important;
  }
</style>
