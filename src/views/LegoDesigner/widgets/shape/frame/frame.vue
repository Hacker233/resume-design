<template>
  <div class="hj-frame-box">
    <div class="current-frame-box"></div>
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
  .hj-frame-box {
    .current-frame-box {
      width: v-bind('props.widgetData?.css.width + "px"');
      height: v-bind('props.widgetData?.css.height + "px"');
      position: relative;
      clip-path: polygon(
        0% 0%,
        0% 100%,
        25% 100%,
        25% 25%,
        75% 25%,
        75% 75%,
        25% 75%,
        25% 100%,
        100% 100%,
        100% 0%
      );
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
      clip-path: polygon(
        0% 0%,
        0% 100%,
        25% 100%,
        25% 25%,
        75% 25%,
        75% 75%,
        25% 75%,
        25% 100%,
        100% 100%,
        100% 0%
      );

      z-index: 0;
    }
  }
</style>
