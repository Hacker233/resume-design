<!-- 实习经验 -->
<template>
  <div class="internship-experience">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 校园经历 -->
    <internship-experience1-vue
      :model-data="modelData"
      :model-style="modelStyle"
    ></internship-experience1-vue>
  </div>
</template>
<script setup lang="ts">
  import { IINTERNSHIPEXPERIENCE } from '@/interface/model';
  import ModelTitle from '@/material/ModelTitle/ModelTitle8/ModelTitle.vue';
  import IMODELSTYLE from '@/interface/modelStyle';
  import InternshipExperience1Vue from '@/material/Common/InternshipExperience/InternshipExperience1.vue';
  defineProps<{
    modelData: IINTERNSHIPEXPERIENCE;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .internship-experience {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    :deep(.internship-experience-list) {
      padding: 0;
    }
  }
</style>
