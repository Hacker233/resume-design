<template>
  <ul class="li-list-box">
    <li :class="[{ 'have-image': widgetData?.customProps.listStyleImage ? true : false }]">
      <svg-icon
        v-if="widgetData?.customProps.listStyleImage"
        :icon-name="widgetData?.customProps.listStyleImage"
        color="#333"
        size="18px"
        class-name="li-list-style-image"
      ></svg-icon>
      91化简
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

  const listStyleType = computed(() => {
    if (props.widgetData?.customProps.listStyleImage) {
      return 'none';
    } else {
      return `${props.widgetData?.customProps.listStyleType} outside`;
    }
  });
</script>
<style lang="scss" scoped>
  .li-list-box {
    width: 140px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 15px;
    color: #333;
    li {
      letter-spacing: 2px;
      font-weight: 500;
      font-size: 18px;
      list-style: v-bind('listStyleType');
      box-sizing: border-box;
    }
    .li-list-style-image {
      margin-right: 3px;
    }
    .have-image {
      width: 100%;
    }
  }
</style>
