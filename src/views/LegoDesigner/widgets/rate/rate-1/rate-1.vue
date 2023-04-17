<template>
  <div class="hj-rate-1-box">
    <el-rate
      v-model="widgetItem.dataSource.rateValue"
      :void-color="widgetData?.props.voidColor"
      :show-text="widgetData?.props.showText"
      :texts="['了解', '一般', '熟悉', '掌握', '精通']"
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
</script>
<style lang="scss" scoped>
  .hj-rate-1-box {
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
    :deep(.el-rate__icon) {
      font-size: v-bind('props.widgetData?.css.rateSize + "px"');
    }
    :deep(.is-active) {
      color: v-bind('props.widgetData?.props.activeColor');
    }
    :deep(.el-rate__text) {
      color: v-bind('props.widgetData?.props.aidedTextColor');
    }
  }
</style>
