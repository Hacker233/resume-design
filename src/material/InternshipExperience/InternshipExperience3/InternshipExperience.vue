<template>
  <internship-experience-com-vue :model-data="modelData" :model-style="modelStyle">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </internship-experience-com-vue>
</template>
<script lang="ts" setup>
  import InternshipExperienceComVue from '@/components/ModelComs/InternshipExperienceCom.vue';
  import ModelTitleVue from '@/material/ModelTitle/ModelTitle3/ModelTitle.vue';
  import { IINTERNSHIPEXPERIENCE } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    modelData: IINTERNSHIPEXPERIENCE;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
