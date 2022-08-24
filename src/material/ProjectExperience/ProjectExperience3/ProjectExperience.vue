<template>
  <project-experience-com-vue :model-data="modelData" :model-style="modelStyle">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </project-experience-com-vue>
</template>
<script lang="ts" setup>
  import ProjectExperienceComVue from '@/components/ModelComs/ProjectExperienceCom.vue';
  import ModelTitleVue from '@/material/ModelTitle/ModelTitle3/ModelTitle.vue';
  import { IPROJECTEXPERIENCE } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    modelData: IPROJECTEXPERIENCE;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
