<template>
  <work-experience-com-vue :model-data="modelData" :model-style="modelStyle">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </work-experience-com-vue>
</template>
<script lang="ts" setup>
  import WorkExperienceComVue from '@/components/ModelComs/WorkExperienceCom.vue';
  import ModelTitleVue from '@/material/ModelTitle/ModelTitle3/ModelTitle.vue';
  import { IWORKEXPERIENCE } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    modelData: IWORKEXPERIENCE;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
