<template>
  <self-evaluation-com-vue :modelData="modelData">
    <!-- 标题 -->
    <template v-slot:model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </self-evaluation-com-vue>
</template>
<script lang="ts" setup>
  import SelfEvaluationComVue from '@/components/ModelComs/SelfEvaluationCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { ISELFEVALUATION } from '@/interface/model';
  defineProps<{
    modelData: ISELFEVALUATION;
  }>();
</script>
