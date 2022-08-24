<template>
  <awards-com-vue :model-data="modelData" :model-style="modelStyle">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </awards-com-vue>
</template>
<script lang="ts" setup>
  import AwardsComVue from '@/components/ModelComs/AwardsCom.vue';
  import ModelTitleVue from '@/material/ModelTitle/ModelTitle3/ModelTitle.vue';
  import { IAWARDS } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    modelData: IAWARDS;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
