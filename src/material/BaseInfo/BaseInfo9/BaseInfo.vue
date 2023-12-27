<template>
  <div class="base-info-9-box">
    <base-info4-vue :model-data="modelData" :model-style="modelStyle"></base-info4-vue>
  </div>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import BaseInfo4Vue from '@/material/Common/BaseInfo/BaseInfo4.vue';

  defineProps<{
    modelData: IBASEINFO; // 模块数据
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped></style>
