<template>
  <internship-experience-com-vue :model-data="modelData">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </internship-experience-com-vue>
</template>
<script lang="ts" setup>
  import InternshipExperienceComVue from '@/components/ModelComs/InternshipExperienceCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { IINTERNSHIPEXPERIENCE } from '@/interface/model';
  defineProps<{
    modelData: IINTERNSHIPEXPERIENCE;
  }>();
</script>
