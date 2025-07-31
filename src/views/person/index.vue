<template>
  <div class="person-box">
    <!-- 简约科技感背景 -->
    <div class="modern-tech-bg">
      <div class="light-effect"></div>
      <div class="circuit-lines"></div>
      <div class="bg-text">{{ userInfo.name }}您好，欢迎来到猫步简历</div>
      <!-- 新增文字 -->
    </div>

    <!-- 个人菜单卡片 -->
    <left-card-vue></left-card-vue>

    <!-- 右侧路由区域 -->
    <right-content-vue></right-content-vue>

    <!-- 客服组件 -->
    <customer-service></customer-service>
  </div>
</template>

<script lang="ts" setup>
  import appStore from '@/store';
  import LeftCardVue from './components/LeftCard.vue';
  import RightContentVue from './components/RightContent.vue';

  const { userInfo } = appStore.useUserInfoStore;
</script>

<style lang="scss" scoped>
  .person-box {
    width: 1250px;
    min-height: 300px;
    margin: 0 auto;
    box-shadow: 0 5px 21px 0 rgba(78, 78, 78, 0.05);
    background-color: #fff;
    border-radius: 0 0 5px 5px;
    position: relative;
    z-index: 0;
    padding: 50px 50px;
    box-sizing: border-box;
    display: flex;
    overflow: hidden;
    margin-top: 30px;

    .modern-tech-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 280px;
      background: linear-gradient(135deg, #1e2a47 0%, #13203a 100%); /* 深蓝渐变 */
      z-index: -1;
      overflow: hidden;

      .light-effect {
        position: absolute;
        width: 100%;
        height: 100%;
        background: radial-gradient(
          circle at 70% 30%,
          rgba(100, 149, 237, 0.3) 0%,
          /* 光效颜色加深 */ transparent 70%
        );
        animation: lightFloat 12s ease-in-out infinite alternate;
      }

      .circuit-lines {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to right, rgba(70, 130, 180, 0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(70, 130, 180, 0.15) 1px, transparent 1px);
        background-size: 30px 30px;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(100, 149, 237, 0.3), transparent);
          animation: scan 8s linear infinite;
        }
      }

      .bg-text {
        position: absolute;
        top: 30%;
        left: 50%;
        width: 100%;
        display: flex;
        justify-content: center;
        transform: translate(-50%, -50%);
        color: rgba(255, 255, 255, 0.75);
        font-size: 2.5rem;
        font-weight: 600;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        pointer-events: none;
        user-select: none;
        text-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
      }
    }
  }

  @keyframes lightFloat {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 0.8;
    }
    50% {
      transform: translate(-10%, 5%) scale(1.05);
      opacity: 1;
    }
    100% {
      transform: translate(5%, -5%) scale(0.95);
      opacity: 0.8;
    }
  }

  @keyframes scan {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
</style>
