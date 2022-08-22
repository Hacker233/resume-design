<template>
  <hobbies-com-vue :model-data="modelData" :data="data">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="data.title" :iconfont="data.iconfont"></model-title-vue>
    </template>
  </hobbies-com-vue>
</template>
<script lang="ts" setup>
  import HobbiesComVue from '@/components/ModelComs/HobbiesCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { IHOBBIES } from '@/interface/model';
  import { IMATERIALITEM } from '@/interface/material';
  defineProps<{
    modelData: IMATERIALITEM;
    data: IHOBBIES;
  }>();
</script>
