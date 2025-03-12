<template>
  <div class="project-introduce-new-box">
    <label>
      <input type="checkbox" />
      <div class="scene">
        <!--太陽月亮-->
        <div class="sun"></div>
        <div class="allstars">
          <div v-for="i in 30" :key="i" :class="`star${i}`"></div>
        </div>
      </div>
    </label>
    <!--内容区域-->
    <div class="content-box">
      <!-- 动态标题 -->
      <h1 class="dynamic-title">一款开源、免费、专业的AI简历生成制作神器</h1>
      <h2>AI智能润色、修改、AI智能诊断，交付源码级JSON，提供海量模版。</h2>

      <!-- DeepSeek 提示 -->
      <div class="deepseek-tip">已接入 DeepSeek，精准、专业的AI简历优化</div>

      <!-- 查看更多按钮 -->
      <div class="see-more-box">
        <hj-button-1 text="免费制作专业简历" @click="freeMakeResume"></hj-button-1>
      </div>

      <!-- 简历图 -->
      <img
        class="mac-png"
        src="../../../assets/images/index-mac.svg"
        alt="猫步简历制作"
        title="猫步简历制作"
      />

      <!-- 下滑提示按钮 -->
      <div class="scroll-more-box" @click.prevent="seeMore">
        <svg-icon
          icon-name="icon-z044"
          size="25px"
          color="rgba(255, 255, 255, 0.5)"
          class-name="more-icon"
        ></svg-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { closeGlobalLoading } from '@/utils/common';
  import HjButton1 from '@/components/HjButton/HjButton1/index.vue';

  const emit = defineEmits(['freeMake', 'seeMore']);

  const freeMakeResume = () => {
    emit('freeMake');
  };

  const seeMore = () => {
    emit('seeMore');
  };

  onUnmounted(() => {
    closeGlobalLoading();
  });
</script>

<style lang="scss" scoped>
  @use 'sass:math'; // 引入 math 模块

  .project-introduce-new-box {
    position: relative;
    max-height: 1800px;
    overflow: hidden; // 防止内容超出容器
  }

  .scene {
    width: 100%;
    max-height: 1800px;
    overflow: hidden;
    background: linear-gradient(180deg, #1d2b49 0%, #1a45a0 50%, #91cdff 75%, #fff 100%);
    background-size: 100% 300%;
  }

  @media (min-width: 600px) {
    .scene {
      height: 100vh;
    }
    .project-introduce-new-box {
      height: 100vh;
    }
  }

  .allstars {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden; // 防止星星动画超出容器
  }

  @keyframes falling {
    0%,
    100% {
      opacity: 0;
      transform: translateY(-100px); // 仅垂直方向动画
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(100vh); // 动画范围限制在视口内
    }
  }

  .allstars [class^='star'] {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: #fff;
    animation: falling 2s infinite;
    position: absolute;
  }

  @for $i from 1 through 30 {
    .allstars .star#{$i} {
      left: random(100) * 1%;
      top: random(100) * 1%;
      animation-delay: -#{math.div(random(30), 10)}s; // 使用 math.div
    }
  }

  .sun {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    left: 30%;
    top: 30%;
    background-color: #ffdd38;
    box-shadow: 0px 0px 20px rgba(255, 221, 56, 0.5);
    opacity: 0;
  }

  .content-box {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 65px;
    box-sizing: border-box;

    h1.dynamic-title {
      font-size: min(4vh, 52px);
      margin-bottom: 30px;
      margin-top: 8vh;
      letter-spacing: 2px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      text-align: center;
    }

    h2 {
      width: 700px;
      font-size: min(1.5vh, 20px);
      text-align: center;
      line-height: 2;
      letter-spacing: 2px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
      opacity: 0.9;
    }

    .deepseek-tip {
      margin-top: 15px;
      font-size: min(2vh, 18px);
      font-weight: 400;
      letter-spacing: 1px;
      color: #ffffff;
      text-shadow: 0 0 5px #00bfff, 0 0 10px #00bfff, 0 0 15px #00bfff, 0 0 20px #00bfff,
        0 0 30px #00bfff, 0 0 40px #00bfff;
      padding: 10px 20px; // 添加内边距
      border-radius: 5px; // 添加圆角
    }

    .see-more-box {
      margin-top: 3vh;
      display: flex;
      z-index: 1;

      :deep(.custom-btn) {
        width: 300px;
        height: 50px;
        span {
          font-size: 18px;
          letter-spacing: 5px;
        }
      }
    }

    .mac-png {
      height: 56%;
      position: absolute;
      bottom: 4.5vh;
      max-height: 800px;
      min-width: 800px;
      object-fit: contain;
    }

    .scroll-more-box {
      position: absolute;
      left: 50%;
      bottom: 5px;
      z-index: 1;
      transition: all 0.3s;

      &:hover {
        opacity: 0.7;
      }

      .more-icon {
        cursor: pointer;
        animation: myfirst 2s infinite;
      }
    }

    @keyframes myfirst {
      0% {
        transform: translate(0px, 0px);
      }
      50% {
        transform: translate(0px, -10px);
      }
      100% {
        transform: translate(0px, 0px);
      }
    }
  }

  input:checked + .scene {
    background-position: 0 100%;
  }

  input:checked + .scene .allstars {
    opacity: 0;
  }

  input:checked + .scene .sun {
    top: 30%;
    opacity: 1;
  }

  input {
    display: none;
  }
</style>
