<template>
  <div class="hj-nonagon-box">
    <div class="current-nonagon-box"></div>
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
  .hj-nonagon-box {
    .current-nonagon-box {
      width: v-bind('props.widgetData?.css.width + "px"');
      height: v-bind('props.widgetData?.css.height + "px"');
      position: relative;
      clip-path: polygon(
        50% 0%,
        83% 12%,
        100% 43%,
        94% 78%,
        68% 100%,
        32% 100%,
        6% 78%,
        0% 43%,
        17% 12%
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
        50% 0%,
        83% 12%,
        100% 43%,
        94% 78%,
        68% 100%,
        32% 100%,
        6% 78%,
        0% 43%,
        17% 12%
      );
      z-index: 0;
    }
  }
</style>
