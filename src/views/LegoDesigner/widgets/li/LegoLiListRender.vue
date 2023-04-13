<template>
  <ul class="li-1-box">
    <li v-for="(item, index) in widgetData?.dataSource.liList" :key="index">{{ item }}</li>
  </ul>
</template>
<script lang="ts" setup>
  import { IWidget } from '@/views/LegoDesigner/types';

  interface IAvatar {
    widgetData: IWidget | null; // 模块数据
  }
  const props = withDefaults(defineProps<IAvatar>(), {
    widgetData: null
  });

  const listStyle = computed(() => {
    return `${props.widgetData?.props.listStyleType} ${props.widgetData?.css.markerPosition}`;
  });
</script>
<style lang="scss" scoped>
  .li-1-box {
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
    color: v-bind('props.widgetData?.css.fontColor');
    background: v-bind('props.widgetData?.css.backgroundColor');
    li {
      font-family: v-bind('props.widgetData?.css.fontFamily');
      font-weight: v-bind('props.widgetData?.css.fontWeight');
      font-size: v-bind('props.widgetData?.css.fontSize + "px"');
      line-height: v-bind('props.widgetData?.css.lineHeight');
      text-align: v-bind('props.widgetData?.css.textAlign');
      list-style-position: v-bind('props.widgetData?.css.markerPosition');
      list-style: v-bind('listStyle');
    }
  }
</style>
