<template>
  <hobbies-com-vue :model-data="modelData">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </hobbies-com-vue>
</template>
<script lang="ts" setup>
  import HobbiesComVue from '@/components/ModelComs/HobbiesCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { IHOBBIES } from '@/interface/model';
  defineProps<{
    modelData: IHOBBIES;
  }>();
</script>
