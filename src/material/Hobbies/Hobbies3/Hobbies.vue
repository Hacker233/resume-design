<template>
  <hobbies-com-vue :model-data="modelData" :model-style="modelStyle">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </hobbies-com-vue>
</template>
<script lang="ts" setup>
  import HobbiesComVue from '@/components/ModelComs/HobbiesCom.vue';
  import ModelTitleVue from '@/material/ModelTitle/ModelTitle3/ModelTitle.vue';
  import { IHOBBIES } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    modelData: IHOBBIES;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
