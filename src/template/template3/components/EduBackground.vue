<template>
  <edu-background-com-vue :modelData="modelData">
    <!-- 标题 -->
    <template v-slot:model-title>
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
