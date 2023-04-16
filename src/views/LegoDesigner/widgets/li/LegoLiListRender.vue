<template>
  <ul class="li-1-box">
    <li
      v-for="(item, index) in widgetData?.dataSource.liList"
      :key="index"
      :class="[{ isOutside: isOutside }]"
    >
      <svg-icon
        v-if="widgetData?.customProps.listStyleImage"
        :icon-name="widgetData?.customProps.listStyleImage"
        :color="widgetData?.css.fontColor"
        :size="widgetData?.css.fontSize + 'px'"
        class-name="li-list-style-image"
      ></svg-icon>
      {{ item }}
    </li>
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

  // 标记位置
  const isOutside = computed(() => {
    return props.widgetData?.css.markerPosition === 'outside';
  });

  const listStyleType = computed(() => {
    if (props.widgetData?.customProps.listStyleImage) {
      return 'none';
    } else {
      return `${props.widgetData?.customProps.listStyleType}`;
    }
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
      list-style-type: v-bind('listStyleType');
    }
    .isOutside {
      display: flex;
      .li-list-style-image {
        flex-grow: 0;
        flex-shrink: 0;
        margin-right: 8px;
        margin-top: 2px;
      }
    }
  }
</style>
