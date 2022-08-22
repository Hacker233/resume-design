<template>
  <self-evaluation-com-vue :model-data="modelData" :data="data">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="data.title" :iconfont="data.iconfont"></model-title-vue>
    </template>
  </self-evaluation-com-vue>
</template>
<script lang="ts" setup>
  import SelfEvaluationComVue from '@/components/ModelComs/SelfEvaluationCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { ISELFEVALUATION } from '@/interface/model';
  import { IMATERIALITEM } from '@/interface/material';
  defineProps<{
    modelData: IMATERIALITEM;
    data: ISELFEVALUATION;
  }>();
</script>
