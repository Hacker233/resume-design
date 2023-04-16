<template>
  <div class="hj-rightArrow-box">
    <div class="current-rightArrow-box"></div>
    <!-- 边框 -->
    <div class="border-box"></div>
  </div>
</template>
<script lang="ts" setup>
  import { IWidget } from '@/views/LegoDesigner/types';

  interface IAvatar {
    widgetData: IWidget | null; // 模块数据
  }
  const props = withDefaults(defineProps<IAvatar>(), {
    widgetData: null
  });
</script>
<style lang="scss" scoped>
  .hj-rightArrow-box {
    .current-rightArrow-box {
      width: v-bind('props.widgetData?.css.width + "px"');
      height: v-bind('props.widgetData?.css.height + "px"');
      position: relative;
      clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
      z-index: 1;
      background: v-bind('props.widgetData?.css.backgroundColor');
    }
    .border-box {
      width: v-bind('props.widgetData?.css.width + props.widgetData?.css.borderWidth + "px"');
      height: v-bind('props.widgetData?.css.height + props.widgetData?.css.borderWidth + "px"');
      background-color: v-bind('props.widgetData?.css.borderColor');
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);

      z-index: 0;
    }
  }
</style>
