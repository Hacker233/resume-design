<template>
  <campus-experience-com-vue :model-data="modelData">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </campus-experience-com-vue>
</template>
<script lang="ts" setup>
  import CampusExperienceComVue from '@/components/ModelComs/CampusExperienceCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { ICAMPUSEXPERIENCE } from '@/interface/model';
  defineProps<{
    modelData: ICAMPUSEXPERIENCE;
  }>();
</script>
