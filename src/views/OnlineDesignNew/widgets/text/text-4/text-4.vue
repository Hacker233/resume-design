<template>
  <p class="text-4-box">
    {{ widgetData?.dataSource.text }}
  </p>
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
  .text-4-box {
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
    font-family: v-bind('props.widgetData?.css.fontFamily');
    font-weight: v-bind('props.widgetData?.css.fontWeight');
    font-size: v-bind('props.widgetData?.css.fontSize + "px"');
    letter-spacing: v-bind('props.widgetData?.css.letterSpace + "px"');
    line-height: v-bind('props.widgetData?.css.lineHeight');
    text-align: v-bind('props.widgetData?.css.textAlign');
    background: linear-gradient(to right, #f0b7a1 0%, #8c3310 50%, #752201 51%, #bf6e4e 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
