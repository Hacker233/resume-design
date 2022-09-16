<!-- 项目经验 -->
<template>
  <div class="project-experience">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <project-experience1-vue
      :model-data="modelData"
      :model-style="modelStyle"
    ></project-experience1-vue>
  </div>
</template>
<script setup lang="ts">
  import { IPROJECTEXPERIENCE } from '@/interface/model';
  import ModelTitle from '@/material/ModelTitle/ModelTitle7/ModelTitle.vue';
  import IMODELSTYLE from '@/interface/modelStyle';
  import ProjectExperience1Vue from '@/material/Common/ProjectExperience/ProjectExperience2.vue';
  defineProps<{
    modelData: IPROJECTEXPERIENCE;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .project-experience {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    display: flex;
    align-items: flex-start;
    :deep(.project-experience-content) {
      flex: 1;
      .project-experience-list {
        padding: 0;
      }
    }
  }
</style>
