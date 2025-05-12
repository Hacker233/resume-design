<template>
  <div class="title">
    <h2 ref="h2Ref" @click="scrollToTop">{{ title }}</h2>
    <p>{{ subtitle }}</p>
  </div>
</template>
<script lang="ts" setup>
  defineProps<{
    title: string;
    subtitle: string;
    titleColor: string;
    subtitleColor: string;
  }>();

  const h2Ref = ref<HTMLElement>();

  const scrollToTop = () => {
    h2Ref.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  };
</script>
<style lang="scss" scoped>
  .title {
    height: 200px;
    background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 10%);
    transition: background 0.6s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    h2 {
      position: relative;
      cursor: pointer;
      transform: translateZ(0);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      margin-bottom: 25px;
      &:hover {
        transform: scale(1.05) translateZ(0);
        text-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
      }
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-weight: 600;
      letter-spacing: 4px;
      transition: all 0.3s ease;
      &::before,
      &::after {
        content: '';
        width: 180px;
        height: 2px;
        background: linear-gradient(90deg, transparent 0%, #6366f1 50%, transparent 100%);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0.8;
        transition: all 0.3s ease;
      }
      &::before {
        left: -220px;
        animation: lineFlow 2.5s infinite linear;
      }
      &::after {
        right: -220px;
        animation: lineFlow 2.5s infinite linear reverse;
      }

      @keyframes lineFlow {
        0% {
          background-position-x: 0%;
        }
        100% {
          background-position-x: 200%;
        }
      }
    }
    p {
      font-size: 14px;
      color: v-bind('subtitleColor');
    }
  }
</style>
