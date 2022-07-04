<!-- 模块公共标题 -->
<template>
  <div class="template2-model-title">
    <div class="icon-box">
      <svg-icon iconName="icon-zhuanyezhishijineng" color="#fff" size="15px"></svg-icon>
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
  }>();
</script>
<style lang="less" scoped>
  .template2-model-title {
    width: 100%;
    display: flex;
    align-items: center;
    .icon-box {
      width: 26px;
      height: 26px;
      background-color: #254665;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
    }
    .right-title {
      width: 100%;
      border-bottom: 1px solid @primary-title-color;
      height: 30px;
      display: flex;
      h1 {
        font-size: v-bind('resumeJsonStore.TITLE_FONT_SIZE');
        color: v-bind('resumeJsonStore.TITLE_COLOR');
        margin: 0;
      }
    }
  }
</style>
