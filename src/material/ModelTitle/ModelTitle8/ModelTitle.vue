<!-- 模块公共标题 -->
<template>
  <div class="template2-model-title">
    <div class="right-title">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>
<script setup lang="ts">
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    title: string;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .template2-model-title {
    width: 100%;
    display: flex;
    align-items: center;
    .right-title {
      width: 100%;
      height: 42px;
      padding-left: 14px;
      border-left: 6px solid #ff9916;
      margin-bottom: 20px;
      background-color: #f6f6f6;
      display: flex;
      align-items: center;
      h1 {
        font-size: v-bind('modelStyle.firstTitleFontSize');
        color: v-bind('modelStyle.themeColor');
      }
    }
  }
</style>
