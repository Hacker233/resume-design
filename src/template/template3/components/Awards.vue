<template>
  <awards-com-vue :modelData="modelData">
    <!-- 标题 -->
    <template v-slot:model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </awards-com-vue>
</template>
<script lang="ts" setup>
  import AwardsComVue from '@/components/ModelComs/AwardsCom.vue';
  import ModelTitleVue from './ModelTitle.vue';
  import { IAWARDS } from '@/interface/model';
  defineProps<{
    modelData: IAWARDS;
  }>();
</script>
