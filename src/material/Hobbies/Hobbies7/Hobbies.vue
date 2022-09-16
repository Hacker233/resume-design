<!-- 兴趣爱好 -->
<template>
  <div class="hobbies">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 兴趣爱好 -->
    <hobbies1-vue :model-data="modelData" :model-style="modelStyle"></hobbies1-vue>
  </div>
</template>
<script setup lang="ts">
  import { IHOBBIES } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import ModelTitle from '@/material/ModelTitle/ModelTitle7/ModelTitle.vue';
  import Hobbies1Vue from '@/material/Common/Hobbies/Hobbies1.vue';
  defineProps<{
    modelData: IHOBBIES;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .hobbies {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    display: flex;
    align-items: flex-start;
    :deep(.hobbies-content) {
      flex: 1;
      padding: 0;
    }
  }
</style>
