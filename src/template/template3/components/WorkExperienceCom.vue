<template>
  <work-experience-com-vue :model-data="modelData">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </work-experience-com-vue>
</template>
<script lang="ts" setup>
  import WorkExperienceComVue from '@/components/ModelComs/WorkExperienceCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { IWORKEXPERIENCE } from '@/interface/model';
  defineProps<{
    modelData: IWORKEXPERIENCE;
  }>();
</script>
