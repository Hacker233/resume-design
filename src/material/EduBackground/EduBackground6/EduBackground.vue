<!-- 教育背景 -->
<template>
  <div class="edu-background">
    <!-- 标题 -->
    <model-title
      :title="modelData.title"
      :iconfont="modelData.iconfont"
      :model-style="modelStyle"
    ></model-title>
    <!-- 教育背景 -->
    <edu-background1-vue :model-data="modelData" :model-style="modelStyle"></edu-background1-vue>
  </div>
</template>
<script setup lang="ts">
  import { IEDUBACKGROUND } from '@/interface/model';
  import ModelTitle from '@/material/ModelTitle/ModelTitle6/ModelTitle.vue';
  import IMODELSTYLE from '@/interface/modelStyle';
  import EduBackground1Vue from '@/material/Common/EduBackground/EduBackground1.vue';
  defineProps<{
    modelData: IEDUBACKGROUND;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .edu-background {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    box-sizing: border-box;
  }
</style>
