<!-- 自我评价 -->
<template>
  <div class="self-eavluation">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 兴趣爱好 -->
    <self-evaluation1-vue :model-data="modelData" :model-style="modelStyle"></self-evaluation1-vue>
  </div>
</template>
<script setup lang="ts">
  import { ISELFEVALUATION } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import ModelTitle from '@/material/ModelTitle/ModelTitle7/ModelTitle.vue';
  import SelfEvaluation1Vue from '@/material/Common/SelfEvaluation/SelfEvaluation1.vue';
  defineProps<{
    modelData: ISELFEVALUATION;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .self-eavluation {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    display: flex;
    align-items: flex-start;
    :deep(.self-eavluation-content) {
      flex: 1;
      padding: 0;
    }
  }
</style>
