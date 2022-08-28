<template>
  <div class="base-info">
    <!-- 模块标题 -->
  </div>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';

  const props = defineProps<{
    modelData: IBASEINFO; // 模块数据
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .base-info {
    width: 100%;
    cursor: pointer;
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
  }
</style>
