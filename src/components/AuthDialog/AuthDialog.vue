<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/store/auth';
  import { ElNotification, FormInstance } from 'element-plus';
  import { computed, onBeforeUnmount, reactive, ref } from 'vue';
  import { useCountdown } from '@/hooks/useCountdown';
  import { validateForm } from './validate';
  import 'element-plus/theme-chalk/el-notification.css';

  const { isShowModal } = storeToRefs(useAuthStore());

  const formRef = ref<FormInstance>();

  const form = reactive({
    email: '',
    username: '',
    password: '',
    repassword: '',
    code: ''
  });

  // 提交表单
  const isEmal = /^((\w-*\.*)+@(\w-?)+(\.\w{2,})+)/;
  const submitForm = () => {
    const isValidate = validateForm(form, actionType.value);
    if (isValidate) {
      console.log(form);
    }
  };

  // 获取验证码
  const { countdown, isEnd } = useCountdown();
  const getCode = () => {
    // 定时结束和输入正确的邮箱则可以获取验证码
    if (isEnd.value) {
      if (!isEmal.test(form.email)) {
        ElNotification({
          title: '请输入正确的邮箱',
          type: 'warning'
        });
        return;
      }
      // 设置为60秒获取一次
      countdown.value = 60;
      // TODO 获取邮箱验证码业务
    }
  };

  // 切换登录方式或注册
  type ActionType = 'email' | 'other' | 'register';
  const actionType = ref<ActionType>('email');
  const handleChangeType = (type: ActionType) => {
    actionType.value = type;
    formRef.value?.resetFields();
  };

  const title = computed(() => {
    switch (actionType.value) {
      case 'email':
        return '邮箱登录';
      case 'other':
        return '用户名登录';
      case 'register':
        return '注册账号';
      default:
        return '邮箱登录';
    }
  });

  onBeforeUnmount(() => {
    actionType.value = 'email';
  });
</script>

<template>
  <el-dialog v-model="isShowModal" :title="title" width="320px">
    <el-form ref="formRef" size="default" :model="form">
      <el-form-item v-show="actionType !== 'email'" prop="username">
        <el-input v-model="form.username" placeholder="用户名" autocomplete="off" />
      </el-form-item>
      <el-form-item v-show="actionType !== 'other'" prop="email">
        <el-input v-model="form.email" placeholder="邮箱" autocomplete="on" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" type="password" placeholder="密码" autocomplete="off" />
      </el-form-item>
      <el-form-item v-show="actionType === 'register'" prop="repassword">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="确认密码"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item v-show="actionType === 'register'" prop="code">
        <el-input v-model="form.code" placeholder="验证码" autocomplete="off">
          <template #append>
            <el-button class="btn" @click="getCode">
              <span v-show="isEnd">获取验证码</span>
              <span v-show="!isEnd" class="code-text">{{ countdown }} 秒后重新发送</span>
            </el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button class="btn" type="primary" size="default" @click="submitForm">{{
          actionType !== 'register' ? '登录' : '注册'
        }}</el-button>
      </el-form-item>
      <el-form-item>
        <div class="space-between">
          <el-button
            v-show="actionType !== 'register'"
            link
            type="primary"
            size="small"
            @click="handleChangeType('register')"
            >注册账号</el-button
          >
          <el-button
            v-show="actionType !== 'email'"
            link
            type="primary"
            size="small"
            @click="handleChangeType('email')"
            >邮箱登录</el-button
          >
        </div>
        <el-button
          v-show="actionType !== 'other'"
          link
          type="primary"
          size="small"
          @click="handleChangeType('other')"
          >其他登录方式</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped>
  .btn {
    width: 100%;
    padding: 0px;
  }

  :deep(.el-input-group__append) {
    flex: none;
    width: 120px;
    padding: 0;
    background: transparent;
    color: #00c091;
    font-size: 12px;
    box-shadow: none;
    border-radius: 0px;
  }

  :deep(.el-input__wrapper) {
    box-shadow: none;
    border-bottom: 1px solid #dcdfe6;
    border-radius: 0px;
  }

  :deep(.is-link) {
    margin-left: 0;
  }

  .code-text {
    color: #909399;
  }

  .space-between {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>
