<template>
  <div class="model-title">
    <h1>{{ title }}</h1>
  </div>
</template>
<script setup lang="ts">
  import { useResumeJsonStore } from '@/store/resume';
  import { storeToRefs } from 'pinia';
  const { resumeJsonStore } = storeToRefs(useResumeJsonStore());
  defineProps<{
    title: string;
  }>();
</script>
<style lang="less" scoped>
  .model-title {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid @primary-title-color;
    h1 {
      font-size: v-bind('resumeJsonStore.GLOBAL_STYLE.titleFontSize');
      color: v-bind('resumeJsonStore.GLOBAL_STYLE.titleColor');
      border-bottom: 3px solid @primary-title-color;
      display: flex;
      align-items: center;
      height: 100%;
      min-width: 150px;
    }
  }
</style>
