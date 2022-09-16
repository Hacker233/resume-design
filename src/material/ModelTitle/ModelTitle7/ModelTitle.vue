<template>
  <div class="model-title-box">
    <div class="title-box">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import IMODELSTYLE from '@/interface/modelStyle';

  defineProps<{
    title: string;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .model-title-box {
    width: 150px;

    .title-box {
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      padding-right: 15px;
      display: flex;
      align-items: center;
      h1 {
        font-size: v-bind('modelStyle.firstTitleFontSize');
        color: v-bind('modelStyle.themeColor');
        font-weight: 600;

        letter-spacing: 2px;
      }
    }
  }
</style>
