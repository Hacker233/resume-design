<template>
  <campus-experience-com-vue :model-data="modelData" :data="data">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="data.title" :iconfont="data.iconfont"></model-title-vue>
    </template>
  </campus-experience-com-vue>
</template>
<script lang="ts" setup>
  import CampusExperienceComVue from '@/components/ModelComs/CampusExperienceCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { ICAMPUSEXPERIENCE } from '@/interface/model';
  import { IMATERIALITEM } from '@/interface/material';
  defineProps<{
    modelData: IMATERIALITEM;
    data: ICAMPUSEXPERIENCE;
  }>();
</script>
