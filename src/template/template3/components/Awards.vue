<template>
  <awards-com-vue :model-data="modelData" :data="data">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="data.title" :iconfont="data.iconfont"></model-title-vue>
    </template>
  </awards-com-vue>
</template>
<script lang="ts" setup>
  import AwardsComVue from '@/components/ModelComs/AwardsCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { IAWARDS } from '@/interface/model';
  import { IMATERIALITEM } from '@/interface/material';
  defineProps<{
    modelData: IMATERIALITEM;
    data: IAWARDS;
  }>();
</script>
