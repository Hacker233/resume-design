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
    width: 100%;
    height: 36px;

    border-bottom: 1px solid v-bind('modelStyle.themeColor');
    .title-box {
      width: 150px;
      height: 100%;
      position: relative;
      background-color: v-bind('modelStyle.themeColor');
      display: flex;
      align-items: center;
      padding-right: 15px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      h1 {
        font-size: v-bind('modelStyle.firstTitleFontSize');
        color: #fff;
        font-weight: 600;

        letter-spacing: 2px;
      }
      &::after {
        content: '';
        position: absolute;
        left: 6px;
        bottom: -18px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 25px 10px;
        border-color: transparent transparent v-bind('modelStyle.themeColor');
        transform: rotate(-90deg);
      }
    }

    .lozenge-1 {
      width: 5px;
      height: 100%;
      background-color: v-bind('modelStyle.themeColor');
      transform: skewX(45deg);
      margin-left: -10px;
    }
    .lozenge-2 {
      width: 10px;
      height: 100%;
      background-color: v-bind('modelStyle.themeColor');
      transform: skewX(45deg);
      margin-left: 5px;
    }
  }
</style>
