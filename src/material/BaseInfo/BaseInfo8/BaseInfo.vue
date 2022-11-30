<template>
  <div class="base-info-8-box">
    <base-info1-vue :model-data="modelData" :model-style="modelStyle"></base-info1-vue>
  </div>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import BaseInfo1Vue from '@/material/Common/BaseInfo/BaseInfo1.vue';

  defineProps<{
    modelData: IBASEINFO; // 模块数据
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .base-info-8-box {
    background: url('@/assets/images/china-head_bg.png') no-repeat;
    height: 236px;
  }
</style>
