<template>
  <div class="person-container">
    <!-- 顶部背景 -->
    <div class="top-bg">
      <div class="bg-gradient"></div>
      <div class="bg-pattern"></div>
      <div class="welcome-section">
        <h1 class="welcome-title">
          {{ userInfo.name }}，欢迎回来
        </h1>
        <p class="welcome-subtitle">
          探索您的个人中心，管理您的简历和账户
        </p>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 左侧卡片 -->
      <LeftCardVue />
      
      <!-- 右侧内容 -->
      <RightContentVue />
    </div>

    <!-- 客服组件 -->
    <customer-service></customer-service>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import appStore from '@/store';
  import LeftCardVue from './components/LeftCard.vue';
  import RightContentVue from './components/RightContent.vue';

  const { userInfo, getAndUpdateUserInfo } = appStore.useUserInfoStore;

  // 只在组件挂载时获取用户信息，避免重复请求
  onMounted(() => {
    getAndUpdateUserInfo();
  });
</script>

<style lang="scss" scoped>
  .person-container {
    min-height: 100vh;
    background-color: #f5f7fa;
    padding-bottom: 60px;
  }

  .top-bg {
    position: relative;
    height: 280px;
    overflow: hidden;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding-top: 60px;

    .bg-gradient {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.05);
    }

    .bg-pattern {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      background-size: 30px 30px;
      animation: patternMove 20s ease-in-out infinite;
    }

    .welcome-section {
      position: relative;
      z-index: 1;
      text-align: center;
      color: white;
      padding: 0 20px;

      .welcome-title {
        font-size: 2.4rem;
        font-weight: 700;
        margin-bottom: 16px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        animation: fadeInUp 1s ease-out;
        letter-spacing: 1.5px;
      }

      .welcome-subtitle {
        font-size: 1.3rem;
        opacity: 0.95;
        animation: fadeInUp 1s ease-out 0.3s both;
        letter-spacing: 0.5px;
        line-height: 1.4;
      }
    }
  }

  @keyframes patternMove {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(10px, 10px);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .main-content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 30px;
    margin-top: -70px;
    position: relative;
    z-index: 2;
    padding: 0 20px;

    @media (max-width: 1240px) {
      width: 100%;
      flex-direction: column;
      align-items: center;
    }

    @media (max-width: 768px) {
      gap: 20px;
      margin-top: -60px;
      padding: 0 15px;
    }
  }

  @media (max-width: 768px) {
    .top-bg {
      height: 240px;
      padding-top: 40px;

      .welcome-section {
        .welcome-title {
          font-size: 1.6rem;
        }

        .welcome-subtitle {
          font-size: 1rem;
          line-height: 1.3;
        }
      }
    }

    .main-content {
      margin-top: -50px;
    }
  }
</style>
