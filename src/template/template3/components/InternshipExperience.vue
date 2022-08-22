<template>
  <internship-experience-com-vue :model-data="modelData" :data="data">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="data.title" :iconfont="data.iconfont"></model-title-vue>
    </template>
  </internship-experience-com-vue>
</template>
<script lang="ts" setup>
  import InternshipExperienceComVue from '@/components/ModelComs/InternshipExperienceCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { IINTERNSHIPEXPERIENCE } from '@/interface/model';
  import { IMATERIALITEM } from '@/interface/material';
  defineProps<{
    modelData: IMATERIALITEM;
    data: IINTERNSHIPEXPERIENCE;
  }>();
</script>
