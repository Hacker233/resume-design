<template>
  <works-display-com-vue :model-data="modelData" :model-style="modelStyle">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </works-display-com-vue>
</template>
<script lang="ts" setup>
  import WorksDisplayComVue from '@/components/ModelComs/WorksDisplayCom.vue';
  import ModelTitleVue from '@/material/ModelTitle/ModelTitle3/ModelTitle.vue';
  import { IWORKSDISPLAY } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    modelData: IWORKSDISPLAY;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
