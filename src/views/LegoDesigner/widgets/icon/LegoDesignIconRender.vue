<template>
  <div class="lego-design-icon-box">
    <svg-icon
      :icon-name="widgetData?.icon"
      :color="widgetData?.css.iconColor"
      :size="widgetData?.css.iconSize + 'px'"
    ></svg-icon>
  </div>
</template>
<script lang="ts" setup>
  import { IWidget } from '../../types';

  interface IWidgetItem {
    widgetData: IWidget | null; // 模块数据
  }
  const props = withDefaults(defineProps<IWidgetItem>(), {
    widgetData: null
  });
</script>
<style lang="scss" scoped>
  .lego-design-icon-box {
    width: v-bind('props.widgetData?.css.width + "px"');
    height: v-bind('props.widgetData?.css.height + "px"');
    border-style: v-bind('props.widgetData?.css.borderStyle');
    border-width: v-bind('props.widgetData?.css.borderWidth + "px"');
    padding: v-bind('props.widgetData?.css.padding.top  + "px"')
      v-bind('props.widgetData?.css.padding.right + "px"')
      v-bind('props.widgetData?.css.padding.bottom + "px"')
      v-bind('props.widgetData?.css.padding.left + "px"');
    border-color: v-bind('props.widgetData?.css.borderColor');
    border-radius: v-bind('props.widgetData?.css.borderRadius+ "px"');
    overflow: hidden;
    background-color: v-bind('props.widgetData?.css.backgroundColor');
    display: flex;
    align-items: center;
    justify-content: v-bind('props.widgetData?.css.textAlign');
  }
</style>
