<template>
  <div class="base-info-1-box">
    <base-info1-vue :model-data="modelData" :model-style="modelStyle"></base-info1-vue>
  </div>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle.js';
  import BaseInfo1Vue from '@/material/Common/BaseInfo/BaseInfo1.vue';
  defineProps<{
    modelData: IBASEINFO; // 模块数据
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
