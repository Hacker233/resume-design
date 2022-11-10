<template>
  <div class="title">
    <div class="left"></div>
    <div class="editor-resume">{{ modelData.title }}</div>
  </div>
</template>
<script lang="ts" setup>
  import { IRESUMETITLE } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    modelData: IRESUMETITLE;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>

<style lang="scss" scoped>
  .title {
    width: 100%;
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    min-height: 32px;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    background-color: v-bind('modelStyle.themeColor');
    display: flex;
    border: none;
    .left {
      flex: 1;
    }

    .editor-resume {
      width: 150px;
      min-height: 32px;
      color: v-bind('modelStyle.textColor');
      outline: none;
      font-weight: v-bind('modelStyle.textFontWeight');
      font-size: v-bind('modelStyle.textFontSize');
      letter-spacing: 2px;
      word-break: break-all;
      display: flex;
      align-items: center;
      background-color: #ff9916;
      justify-content: center;
      margin-right: 100px;
    }
  }
</style>
