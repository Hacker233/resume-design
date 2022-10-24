<!-- 姓名与简介 -->
<template>
  <div v-if="modelData" class="name-introduce">
    <h1>{{ modelData.name }}</h1>
    <p v-show="modelData.isShow.abstract" v-dompurify-html="modelData.abstract"></p>
  </div>
</template>
<script lang="ts" setup>
  import { ICUSTOM1 } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    modelData: ICUSTOM1;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .name-introduce {
    width: 100%;
    cursor: pointer;
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    h1 {
      height: 30px;
      line-height: 29px;
      font-size: v-bind('modelStyle.titleFontSize');
      color: v-bind('modelStyle.titleColor');
      font-weight: v-bind('modelStyle.titleFontWeight');
      margin: 0 0 25px 0;
    }
    p {
      font-size: v-bind('modelStyle.textFontSize');
      color: v-bind('modelStyle.textColor');
      font-weight: v-bind('modelStyle.textFontWeight');
    }
  }
</style>
