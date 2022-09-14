<!-- 荣誉奖项 -->
<template>
  <div class="awards">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 荣誉奖项 -->
    <awards1-vue :model-data="modelData" :model-style="modelStyle"></awards1-vue>
  </div>
</template>
<script setup lang="ts">
  import { IAWARDS } from '@/interface/model';
  import ModelTitle from '@/material/ModelTitle/ModelTitle6/ModelTitle.vue';
  import IMODELSTYLE from '@/interface/modelStyle';
  import Awards1Vue from '@/material/Common/Awards/Awards1.vue';
  defineProps<{
    modelData: IAWARDS;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .awards {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
  }
</style>
