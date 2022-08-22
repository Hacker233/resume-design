<template>
  <job-intention-com-vue :model-data="modelData" :data="data">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="data.title" :iconfont="data.iconfont"></model-title-vue>
    </template>
  </job-intention-com-vue>
</template>
<script lang="ts" setup>
  import JobIntentionComVue from '@/components/ModelComs/JobIntentionCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { IJOBINTENTION } from '@/interface/model';
  import { IMATERIALITEM } from '@/interface/material';
  defineProps<{
    modelData: IMATERIALITEM;
    data: IJOBINTENTION;
  }>();
</script>
