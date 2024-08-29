<template>
  <div class="post-work-success-box">
    <div class="icon-box">
      <svg-icon icon-name="icon-icon" color="#00c091" size="100px"></svg-icon>
    </div>
    <div class="goEmail">
      <p>您的作品已提交，管理员正快马加鞭审核中！审核进度可前往个人中心查看。</p>
    </div>

    <!-- 重新发送验证链接 -->
    <div class="resend-email">
      <el-button class="resend-email-btn" @click="toPerson">个人中心</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const router = useRouter();
  const toPerson = () => {
    router.push('/person/legoCreate');
  };
</script>
<style lang="scss" scoped>
  .post-work-success-box {
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
