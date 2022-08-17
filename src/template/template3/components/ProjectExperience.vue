<template>
  <project-experience-com-vue :model-data="modelData">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </project-experience-com-vue>
</template>
<script lang="ts" setup>
  import ProjectExperienceComVue from '@/components/ModelComs/ProjectExperienceCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { IPROJECTEXPERIENCE } from '@/interface/model';
  defineProps<{
    modelData: IPROJECTEXPERIENCE;
  }>();
</script>
