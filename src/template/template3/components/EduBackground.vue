<template>
  <edu-background-com-vue :model-data="modelData" :data="data">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="data.title" :iconfont="data.iconfont"></model-title-vue>
    </template>
  </edu-background-com-vue>
</template>
<script lang="ts" setup>
  import EduBackgroundComVue from '@/components/ModelComs/EduBackgroundCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { IEDUBACKGROUND } from '@/interface/model';
  import { IMATERIALITEM } from '@/interface/material';
  defineProps<{
    modelData: IMATERIALITEM;
    data: IEDUBACKGROUND;
  }>();
</script>
