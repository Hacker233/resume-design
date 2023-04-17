<template>
  <div class="hj-rate-4-box">
    <el-progress
      :percentage="widgetData?.dataSource.rateValue * 20"
      :width="widgetData?.css.width"
      :stroke-width="widgetData?.props.rateHeight"
      :color="widgetData?.props.activeColor"
      :show-text="widgetData?.props.showText"
      :format="format"
      type="dashboard"
    />
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

  // 辅助文字提示内容
  const format = (percentage: number) => {
    if (percentage === 20) {
      return '了解';
    } else if (percentage === 40) {
      return '一般';
    } else if (percentage === 60) {
      return '熟悉';
    } else if (percentage === 80) {
      return '掌握';
    } else if (percentage === 100) {
      return '精通';
    } else {
      return '';
    }
  };
</script>
<style lang="scss" scoped>
  .hj-rate-4-box {
    width: v-bind('props.widgetData?.css.width + "px"');
    height: v-bind('props.widgetData?.css.height + "px"');
    border-style: v-bind('props.widgetData?.css.borderStyle');
    border-width: v-bind('props.widgetData?.css.borderWidth + "px"');
    padding: v-bind('props.widgetData?.css.padding.top  + "px"')
      v-bind('props.widgetData?.css.padding.right + "px"')
      v-bind('props.widgetData?.css.padding.bottom + "px"')
      v-bind('props.widgetData?.css.padding.left + "px"');
    border-color: v-bind('props.widgetData?.css.borderColor');
    border-radius: v-bind('props.widgetData?.css.borderRadius + "px"');
    background: v-bind('props.widgetData?.css.backgroundColor');
    :deep(.el-progress__text) {
      span {
        font-size: v-bind('props.widgetData?.css.fontSize + "px"');
        color: v-bind('props.widgetData?.props.aidedTextColor');
      }
    }
  }
</style>
