<template>
  <project-experience-com-vue :model-data="modelData"  :data="data">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="data.title" :iconfont="data.iconfont"></model-title-vue>
    </template>
  </project-experience-com-vue>
</template>
<script lang="ts" setup>
  import ProjectExperienceComVue from '@/components/ModelComs/ProjectExperienceCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { IPROJECTEXPERIENCE } from '@/interface/model';
import { IMATERIALITEM } from '@/interface/material';
  defineProps<{
    modelData: IMATERIALITEM;
    data: IPROJECTEXPERIENCE;
  }>();
</script>
