<template>
  <div class="model-title">
    <h1>{{ title }}</h1>
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
  .model-title {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid v-bind('modelStyle.themeColor');
    h1 {
      font-size: v-bind('modelStyle.firstTitleFontSize');
      color: v-bind('modelStyle.themeColor');
      border-bottom: 3px solid v-bind('modelStyle.themeColor');
      display: flex;
      align-items: center;
      height: 100%;
      min-width: 150px;
    }
  }
</style>
