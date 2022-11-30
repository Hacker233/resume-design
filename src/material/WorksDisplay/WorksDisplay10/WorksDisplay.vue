<!-- 作品展示 -->
<template>
  <div class="works-display">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 作品展示 -->
    <works-display1-vue :model-data="modelData" :model-style="modelStyle"></works-display1-vue>
  </div>
</template>
<script setup lang="ts">
  import { IWORKSDISPLAY } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import ModelTitle from '@/material/ModelTitle/ModelTitle9/ModelTitle.vue';
  import WorksDisplay1Vue from '@/material/Common/WorksDisplay/WorksDisplay1.vue';
  defineProps<{
    modelData: IWORKSDISPLAY;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .works-display {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    :deep(.works-display-list) {
      padding: 0;
      margin-top: 20px;
    }
  }
</style>
