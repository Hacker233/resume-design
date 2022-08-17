<template>
  <edu-background-com-vue :model-data="modelData">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </edu-background-com-vue>
</template>
<script lang="ts" setup>
  import EduBackgroundComVue from '@/components/ModelComs/EduBackgroundCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { IEDUBACKGROUND } from '@/interface/model';
  defineProps<{
    modelData: IEDUBACKGROUND;
  }>();
</script>
