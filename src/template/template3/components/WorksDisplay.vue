<template>
  <works-display-com-vue :model-data="modelData">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </works-display-com-vue>
</template>
<script lang="ts" setup>
  import WorksDisplayComVue from '@/components/ModelComs/WorksDisplayCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { IWORKSDISPLAY } from '@/interface/model';
  defineProps<{
    modelData: IWORKSDISPLAY;
  }>();
</script>
