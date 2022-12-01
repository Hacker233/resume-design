<template>
  <div class="base-info-2-box">
    <base-info2-vue :model-data="modelData" :model-style="modelStyle"></base-info2-vue>
  </div>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle.js';
  import BaseInfo2Vue from '@/material/Common/BaseInfo/BaseInfo2.vue';
  defineProps<{
    modelData: IBASEINFO; // 模块数据
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
