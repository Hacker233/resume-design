<template>
  <job-intention-com-vue :model-data="modelData">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </job-intention-com-vue>
</template>
<script lang="ts" setup>
  import JobIntentionComVue from '@/components/ModelComs/JobIntentionCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { IJOBINTENTION } from '@/interface/model';
  defineProps<{
    modelData: IJOBINTENTION;
  }>();
</script>
