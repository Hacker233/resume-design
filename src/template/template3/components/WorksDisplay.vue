<template>
  <works-display-com-vue :model-data="modelData" :data="data">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="data.title" :iconfont="data.iconfont"></model-title-vue>
    </template>
  </works-display-com-vue>
</template>
<script lang="ts" setup>
  import WorksDisplayComVue from '@/components/ModelComs/WorksDisplayCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { IWORKSDISPLAY } from '@/interface/model';
  import { IMATERIALITEM } from '@/interface/material';
  defineProps<{
    modelData: IMATERIALITEM;
    data: IWORKSDISPLAY;
  }>();
</script>
