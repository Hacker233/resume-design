<template>
  <div class="model-title-box">
    <div class="icon-box">
      <svg-icon :iconName="iconfont" color="#fff" size="15px"></svg-icon>
    </div>
    <div class="right-title">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>
<script setup lang="ts">
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  const { resumeJsonStore } = storeToRefs(appStore.useResumeJsonStore);
  defineProps<{
    title: string;
    iconfont: string;
  }>();
</script>
<style lang="scss" scoped>
  .model-title-box {
    display: flex;
    align-items: center;
    position: relative;
    left: -42px;
    .icon-box {
      background: v-bind('resumeJsonStore.GLOBAL_STYLE.themeColor');
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .right-title {
      h1 {
        font-size: v-bind('resumeJsonStore.GLOBAL_STYLE.firstTitleFontSize');
        color: v-bind('resumeJsonStore.GLOBAL_STYLE.themeColor');
      }
    }
  }
</style>
