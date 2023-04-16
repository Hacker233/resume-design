<template>
  <div class="hj-cross-box">
    <div class="current-cross-box"></div>
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
  .hj-cross-box {
    .current-cross-box {
      width: v-bind('props.widgetData?.css.width + "px"');
      height: v-bind('props.widgetData?.css.height + "px"');
      position: relative;
      clip-path: polygon(
        10% 25%,
        35% 25%,
        35% 0%,
        65% 0%,
        65% 25%,
        90% 25%,
        90% 50%,
        65% 50%,
        65% 100%,
        35% 100%,
        35% 50%,
        10% 50%
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
        10% 25%,
        35% 25%,
        35% 0%,
        65% 0%,
        65% 25%,
        90% 25%,
        90% 50%,
        65% 50%,
        65% 100%,
        35% 100%,
        35% 50%,
        10% 50%
      );

      z-index: 0;
    }
  }
</style>
