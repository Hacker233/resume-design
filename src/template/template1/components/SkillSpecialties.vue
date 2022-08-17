<template>
  <skill-specialties-com-vue :model-data="modelData">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </skill-specialties-com-vue>
</template>
<script lang="ts" setup>
  import SkillSpecialtiesComVue from '@/components/ModelComs/SkillSpecialtiesCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { ISKILLSPECIALTIES } from '@/interface/model';
  defineProps<{
    modelData: ISKILLSPECIALTIES;
  }>();
</script>
