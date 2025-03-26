<template>
  <!-- 生成简历等待动画 -->
  <div class="ai-loading-box">
    <!-- 简历模版预览 -->
    <ResumePreview />
    <div class="loading-box">
      <!-- 毛玻璃遮罩层 -->
      <div class="frosted-glass"></div>
      <h3 class="cyber-title"
        >简历正在智能生成中<span class="dot-cursor"
          ><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></span
        ></h3
      >

      <div class="loading-animation-box">
        <AiLoading />
      </div>
      <p class="estimated-time">预计等待时长2分钟</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import AiLoading from '@/components/AiLoading/AiLoading.vue';
  import ResumePreview from './ResumePreview.vue';
</script>

<style lang="scss" scoped>
  .ai-loading-box {
    width: 820px;
    height: 1160px;
    background: white;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(143, 102, 214, 0.25);
    margin-bottom: 30px;

    .loading-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      z-index: 2;

      .frosted-glass {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        z-index: -1;
      }

      .cyber-title {
        font-family: 'Orbitron', sans-serif;
        color: #5a4ff3;
        text-shadow: 0 0 10px rgba(90, 79, 243, 0.3), 0 0 20px rgba(90, 79, 243, 0.2);
        margin-bottom: 16px;
        font-size: 22px;
        letter-spacing: 1px;
        background: linear-gradient(90deg, #5a4ff3, #00d2ff);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: textGlow 2s infinite alternate;
      }

      .estimated-time {
        font-family: 'Orbitron', sans-serif; /* 使用与标题相同的字体 */
        color: #8f66d6; /* 使用紫色系颜色 */
        font-size: 16px; /* 稍小于标题字号 */
        letter-spacing: 0.5px; /* 适当的字母间距 */
        margin-top: 20px; /* 与上方元素间距 */
        text-shadow: 0 0 5px rgba(143, 102, 214, 0.3); /* 微弱的发光效果 */
        background: linear-gradient(90deg, #8f66d6, #5a4ff3); /* 渐变色文字 */
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        opacity: 0.9; /* 轻微透明 */
      }

      .loading-animation-box {
        border-radius: 12px;
        padding: 20px;
      }

      .dot-cursor {
        display: inline-block;
        width: 36px;
        text-align: left;
      }

      .dot {
        opacity: 0;
        color: #5a4ff3;
        text-shadow: 0 0 5px rgba(90, 79, 243, 0.5);
        animation: dotPulse 1.5s infinite ease-in-out;
        position: relative;

        &:nth-child(1) {
          animation-delay: 0s;
          color: #8f66d6;
        }
        &:nth-child(2) {
          animation-delay: 0.2s;
          color: #5a4ff3;
        }
        &:nth-child(3) {
          animation-delay: 0.4s;
          color: #00d2ff;
        }
      }
    }
  }

  @keyframes textGlow {
    0% {
      text-shadow: 0 0 10px rgba(90, 79, 243, 0.3);
    }
    100% {
      text-shadow: 0 0 15px rgba(90, 79, 243, 0.5), 0 0 25px rgba(0, 210, 255, 0.3);
    }
  }

  @keyframes dotPulse {
    0%,
    100% {
      opacity: 0;
      transform: translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-3px);
      text-shadow: 0 0 8px currentColor;
    }
  }
</style>
