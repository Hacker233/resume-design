<template>
  <div class="base-info-3-box">
    <base-info3-vue :model-data="modelData" :model-style="modelStyle"></base-info3-vue>
  </div>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import BaseInfo3Vue from '@/material/Common/BaseInfo/BaseInfo3.vue';
  defineProps<{
    modelData: IBASEINFO; // 模块数据
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
