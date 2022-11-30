<template>
  <div class="model-title-9-box">
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
  .model-title-9-box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;
    .title-box {
      width: 200px;
      height: 30px;
      background: url('@/assets/images/title_bg.png') no-repeat;
      display: flex;
      padding-left: 22px;
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
