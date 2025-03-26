<template>
  <div class="tech-loading">
    <ul>
      <li v-for="i in 10" :key="i"></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .tech-loading {
    // background-color: white; // 白色背景
    overflow: hidden;
    position: relative;
    min-height: 200px;
    min-width: 200px;
    height: 100%;
    width: 100%;
  }

  .tech-loading ul {
    position: absolute;
    left: calc(50% - 0.7em);
    top: calc(50% - 4.2em);
    display: inline-block;
    text-indent: 2.8em;
    list-style: none;
  }

  .tech-loading ul li {
    position: absolute;
    padding-bottom: 5.6em;
    top: 0;
    left: 0;

    // 科技渐变背景
    &:after {
      content: '';
      display: block;
      width: 1.4em;
      height: 1.4em;
      border-radius: 100%;
      background: linear-gradient(135deg, #00d2ff 0%, #7fa2d4 50%, #a355e8 100%);
      box-shadow: 0 0 10px rgba(84, 133, 202, 0.7);
    }
  }

  // 为每个li设置旋转角度和动画延迟
  @for $i from 1 through 10 {
    .tech-loading li:nth-child(#{$i}) {
      transform: rotate(#{($i - 1) * 36}deg);
      animation-delay: #{$i * 0.125}s;

      &:after {
        animation-delay: #{$i * 0.125}s;
      }
    }
  }

  // 动画效果
  .tech-loading li {
    animation: dotBounce 2.5s infinite ease-in-out;
  }

  .tech-loading li:after {
    animation: pulseGlow 2.5s infinite;
  }

  @keyframes dotBounce {
    0%,
    55%,
    100% {
      padding: 0 0 5.6em 0;
    }
    5%,
    50% {
      padding: 2.8em 0;
    }
  }

  @keyframes pulseGlow {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
      box-shadow: 0 0 15px rgba(58, 123, 213, 0.9);
    }
  }
</style>
