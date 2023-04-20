<template>
  <div class="hj-other-1-box">
    <div class="icon-box">
      <svg-icon
        :icon-name="widgetData?.props.icon"
        :color="widgetData?.css.iconColor"
        :size="widgetData?.css.iconSize + 'px'"
      ></svg-icon>
    </div>
    <p>{{ widgetData?.dataSource.text }}</p>
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
  .hj-other-1-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    p {
      color: v-bind('props.widgetData?.css.fontColor');
      font-family: v-bind('props.widgetData?.css.fontFamily');
      font-weight: v-bind('props.widgetData?.css.fontWeight');
      font-size: v-bind('props.widgetData?.css.fontSize + "px"');
      letter-spacing: v-bind('props.widgetData?.css.letterSpace + "px"');
      letter-spacing: v-bind('props.widgetData?.css.letterSpace + "px"');
    }
  }
</style>
