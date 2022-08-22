<template>
  <work-experience-com-vue :model-data="modelData" :data="data">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="data.title" :iconfont="data.iconfont"></model-title-vue>
    </template>
  </work-experience-com-vue>
</template>
<script lang="ts" setup>
  import WorkExperienceComVue from '@/components/ModelComs/WorkExperienceCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { IWORKEXPERIENCE } from '@/interface/model';
  import { IMATERIALITEM } from '@/interface/material';
  defineProps<{
    modelData: IMATERIALITEM;
    data: IWORKEXPERIENCE;
  }>();
</script>
