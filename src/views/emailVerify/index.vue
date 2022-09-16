<template>
  <div class="email-verify-box">
    <div v-if="!isValid" class="icon-box">
      <svg-icon icon-name="icon-guanbi" color="red" size="100px"></svg-icon>
    </div>
    <div v-else class="icon-box">
      <svg-icon icon-name="icon-icon" color="#00c091" size="100px"></svg-icon>
    </div>
    <div v-if="!isValid" class="goEmail">
      <p>您还需要验证您的电子邮箱才可正常使用！</p>
      <a :href="emailUrl" target="_blank" rel="noopener noreferrer">点击前往邮箱立即验证>></a>
    </div>
    <div v-else class="goEmail">
      <p>您的邮箱已经验证通过啦！</p>
    </div>
    <!-- 重新发送验证链接 -->
    <div v-if="!isValid" class="resend-email">
      <el-button class="resend-email-btn" :loading="isLoading" @click="resendEmail">{{
        sendText
      }}</el-button>
      <!-- <p @click="resendEmail"></p> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { getUserInfoAsync, resendVerificationAsync } from '@/http/api/user';
  import { ElMessage } from 'element-plus';
  const route = useRoute();
  let email: string = route.query.email as string;
  // 查询邮箱是否验证通过
  const isValid = ref<boolean>(false);
  const getUserInfo = async () => {
    const data = await getUserInfoAsync(email);
    if (data.data.status === 200) {
      isValid.value = data.data.data.auth.email.valid;
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      });
    }
  };
  getUserInfo();

  // 重新发送邮件验证链接
  const sendText = ref<string>('重新发送邮件');
  const isLoading = ref<boolean>(false);
  const resendEmail = async () => {
    sendText.value = '发送中';
    isLoading.value = true;
    const data = await resendVerificationAsync(email);
    if (data.status === 200) {
      ElMessage({
        message: '发送成功',
        type: 'success'
      });
      sendText.value = '重新发送邮件';
      isLoading.value = false;
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      });
      sendText.value = '重新发送邮件';
      isLoading.value = false;
    }
  };

  // 返回邮箱地址
  const emailSuffix = email.split('@')[1].toLowerCase();
  const emailUrl = ref<string>('');
  switch (emailSuffix) {
    case '163.com':
      emailUrl.value = 'https://mail.163.com';
      break;
    case 'vip.163.com':
      emailUrl.value = 'https://vip.163.com';
      break;
    case 'mail.126.com':
      emailUrl.value = 'https://mail.126.com';
      break;
    case 'qq.com':
    case 'vip.qq.com':
    case 'foxmail.com':
      emailUrl.value = 'https://mail.qq.com';
      break;
    case 'gmail.com':
      emailUrl.value = 'https://mail.google.com';
      break;
    case 'sohu.com':
      emailUrl.value = 'https://mail.sohu.com';
      break;
    case 'tom.com':
      emailUrl.value = 'https://mail.tom.com';
      break;
    case 'vip.sina.com':
      emailUrl.value = 'https://vip.sina.com';
      break;
    case 'sina.com.cn':
    case 'sina.com':
      emailUrl.value = 'https://mail.sina.com.cn';
      break;
    case 'tom.com':
      emailUrl.value = 'https://mail.tom.com';
      break;
    case 'yahoo.com.cn':
    case 'yahoo.cn':
      emailUrl.value = 'https://mail.cn.yahoo.com';
      break;
    case 'yeah.net':
      emailUrl.value = 'https://www.yeah.net';
      break;
    case '21cn.com':
      emailUrl.value = 'https://mail.21cn.com';
      break;
    case 'hotmail.com':
      emailUrl.value = 'https://www.hotmail.com';
      break;
    case 'sogou.com':
      emailUrl.value = 'https://mail.sogou.com';
      break;
    case '188.com':
      emailUrl.value = 'https://www.188.com';
      break;
    case '139.com':
      emailUrl.value = 'https://mail.10086.cn';
      break;
    case '189.cn':
      emailUrl.value = 'https://webmail15.189.cn/webmail';
      break;
    case 'wo.com.cn':
      emailUrl.value = 'https://mail.wo.com.cn/smsmail';
      break;
    case 'wo.com.cn':
      emailUrl.value = 'https://mail.wo.com.cn/smsmail';
      break;
    default:
      emailUrl.value = `https://mail.${emailSuffix}`;
      break;
  }
</script>
<style lang="scss" scoped>
  .email-verify-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 30px;
    .goEmail {
      display: flex;
      margin-top: 20px;
      font-size: 20px;
      a {
        text-decoration: none;
        color: #00c091;
        border-bottom: 1px solid transparent;
        &:hover {
          color: #049571;
          border-bottom: 1px solid #049571;
        }
      }
    }

    .resend-email {
      margin: 20px 0;
      .resend-email-btn {
        color: #00c091;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 16px;
        border-bottom: 1px solid transparent;
        border: none;
        background: none;
        &:hover {
          color: #049571;
          border-bottom: 1px solid #049571;
        }
      }
    }
  }
</style>
