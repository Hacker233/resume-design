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
  import { useResumeJsonStore } from '@/store/resume';
  import { storeToRefs } from 'pinia';
  const { resumeJsonStore } = storeToRefs(useResumeJsonStore());
  defineProps<{
    title: string;
    iconfont: string;
  }>();
</script>
<style lang="less" scoped>
  .model-title-box {
    display: flex;
    align-items: center;
    .icon-box {
      background: #589bf7;
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
        color: #079cfa;
        font-size: 20px;
      }
    }
  }
</style>
