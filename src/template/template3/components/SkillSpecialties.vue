<template>
  <skill-specialties-com-vue :model-data="modelData" :data="data">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="data.title" :iconfont="data.iconfont"></model-title-vue>
    </template>
  </skill-specialties-com-vue>
</template>
<script lang="ts" setup>
  import SkillSpecialtiesComVue from '@/components/ModelComs/SkillSpecialtiesCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { ISKILLSPECIALTIES } from '@/interface/model';
  import { IMATERIALITEM } from '@/interface/material';
  defineProps<{
    modelData: IMATERIALITEM;
    data: ISKILLSPECIALTIES;
  }>();
</script>
