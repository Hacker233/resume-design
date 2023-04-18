<template>
  <div class="hj-rate-5-box">
    <el-slider
      :model-value="widgetData?.dataSource.rateValue * 20"
      :step="20"
      size="small"
      :format-tooltip="formatTooltip"
      :show-tooltip="widgetData?.props.showText"
      @input="handleChange"
    />
  </div>
</template>
<script lang="ts" setup>
  import { useGetWidgetItemById } from '@/views/LegoDesigner/hooks/useSelectWidgetItem';
  import { IWidget } from '@/views/LegoDesigner/types';

  interface IAvatar {
    widgetData: IWidget | null; // 模块数据
  }
  const props = withDefaults(defineProps<IAvatar>(), {
    widgetData: null
  });

  // widgetItem
  const { widgetItem } = useGetWidgetItemById(props.widgetData?.id as string);

  // 辅助文字提示内容
  const formatTooltip = (percentage: number) => {
    if (percentage <= 20) {
      return '了解';
    } else if (percentage <= 40) {
      return '一般';
    } else if (percentage <= 60) {
      return '熟悉';
    } else if (percentage <= 80) {
      return '掌握';
    } else if (percentage <= 100) {
      return '精通';
    } else {
      return '';
    }
  };

  // 改变
  const handleChange = (percentage: number) => {
    if (percentage <= 20) {
      widgetItem.dataSource.rateValue = 1;
    } else if (percentage <= 40) {
      widgetItem.dataSource.rateValue = 2;
    } else if (percentage <= 60) {
      widgetItem.dataSource.rateValue = 3;
    } else if (percentage <= 80) {
      widgetItem.dataSource.rateValue = 4;
    } else if (percentage <= 100) {
      widgetItem.dataSource.rateValue = 5;
    } else {
      widgetItem.dataSource.rateValue = 0;
    }
  };
</script>
<style lang="scss" scoped>
  .hj-rate-5-box {
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
    :deep(.el-slider) {
      .el-slider__bar {
        background-color: v-bind('props.widgetData?.props.activeColor');
        border-radius: 0;
        height: v-bind('props.widgetData?.props.rateHeight + "px"');
        border-radius: v-bind('props.widgetData?.css.borderRadius + "px"');
      }
      .el-slider__runway {
        height: v-bind('props.widgetData?.props.rateHeight + "px"');
      }
      .el-slider__button {
        width: v-bind('props.widgetData?.props.rateHeight + 5 + "px"');
        height: v-bind('props.widgetData?.props.rateHeight + 5+ "px"');
        background-color: v-bind('props.widgetData?.props.activeColor');
        border: none;
      }
      .el-slider__button-wrapper {
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .el-slider__runway {
        border-radius: v-bind('props.widgetData?.css.borderRadius + "px"');
      }
    }
  }
</style>
