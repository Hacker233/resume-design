<template>
  <ul class="li-list-box">
    <li ref="liRef">91化简</li>
  </ul>
</template>
<script lang="ts" setup>
  import { IWidget } from '@/views/LegoDesigner/types';
  import { getListStyleImageFile } from '../../utils/common';

  interface IAvatar {
    widgetData: IWidget | null; // 模块数据
  }
  const props = withDefaults(defineProps<IAvatar>(), {
    widgetData: null
  });

  const liRef = ref<any>(null);
  const listStyleType = computed(() => {
    if (props.widgetData?.props.listStyleImage) {
      liRef.value.style.background = `url(${getListStyleImageFile(
        props.widgetData?.props.listStyleImage
      )}) no-repeat`;
      liRef.value.style.backgroundPosition = 'center left';
      liRef.value.style.width = '100%';
      liRef.value.style.paddingLeft = '30px';
      liRef.value.style.backgroundSize = '28px';
      return 'none';
    } else {
      return `${props.widgetData?.props.listStyleType} outside`;
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
  }
</style>
