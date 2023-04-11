<template>
  <div class="lego-design-icon-box">
    <svg-icon :icon-name="widgetData?.icon" color="#74a274" size="25px"></svg-icon>
  </div>
</template>
<script lang="ts" setup>
  import { IWidget } from '../../types';

  interface IWidgetItem {
    widgetData: IWidget | null; // 模块数据
  }
  withDefaults(defineProps<IWidgetItem>(), {
    widgetData: null
  });
</script>
<style lang="scss" scoped>
  .lego-design-icon-box {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
