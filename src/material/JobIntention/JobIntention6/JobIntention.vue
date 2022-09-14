<template>
  <div class="job-intention">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 内容区域 -->
    <job-intention1 :model-data="modelData" :model-style="modelStyle"></job-intention1>
  </div>
</template>
<script setup lang="ts">
  import ModelTitle from '@/material/ModelTitle/ModelTitle6/ModelTitle.vue';
  import { IJOBINTENTION } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import JobIntention1 from '../../Common/JobIntention/JobIntention1.vue';
  defineProps<{
    modelData: IJOBINTENTION;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .job-intention {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    margin-top: v-bind('modelStyle.mTop');
    margin-bottom: v-bind('modelStyle.mBottom');
    box-sizing: border-box;
  }
</style>
