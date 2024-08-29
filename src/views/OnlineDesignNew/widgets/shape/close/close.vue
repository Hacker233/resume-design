<template>
  <div class="hj-close-box">
    <div class="current-close-box"></div>
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
  .hj-close-box {
    .current-close-box {
      width: v-bind('props.widgetData?.css.width + "px"');
      height: v-bind('props.widgetData?.css.height + "px"');
      position: relative;
      clip-path: polygon(
        20% 0%,
        0% 20%,
        30% 50%,
        0% 80%,
        20% 100%,
        50% 70%,
        80% 100%,
        100% 80%,
        70% 50%,
        100% 20%,
        80% 0%,
        50% 30%
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
        20% 0%,
        0% 20%,
        30% 50%,
        0% 80%,
        20% 100%,
        50% 70%,
        80% 100%,
        100% 80%,
        70% 50%,
        100% 20%,
        80% 0%,
        50% 30%
      );

      z-index: 0;
    }
  }
</style>
