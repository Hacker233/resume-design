<template>
  <div ref="titleRef" class="module-title-11" :style="moduleTitleStyle">
    <hj-h1-1 :title="module.title" :style="moduleTitleFontStyle"></hj-h1-1>
    <div class="left" :style="lineStyle">
      <img class="img-1" src="@/assets/images/modulelist.png" alt="列表" />
      <img class="moduleborder" src="@/assets/images/moduleborder.png" alt="边框" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import HjH11 from '../components/hj-h1-1.vue';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';

  const props = defineProps<{
    module: IModule;
  }>();

  // 返回模块整体样式
  const moduleTitleStyle: any = useGetCustomStyle(props.module, 'moduleTitle');

  // 返回标题字体样式
  const moduleTitleFontStyle = useGetCustomStyle(props.module, 'moduleTitleFont');

  // 返回左侧竖线样式
  const titleRef = ref<any>(null);
  const titleHeight = ref<number>(0);
  const titleMarginBottom = ref<number>(0);
  const lineStyle: any = computed(() => {
    const paddingTop = props.module.css.padding.top || 0; // 组件上边距
    const paddingLeft = props.module.css.padding.left || 0; // 组件左侧内边距
    // 获取标题高度
    if (titleRef.value) {
      titleHeight.value = titleRef.value.clientHeight;
    }
    for (let i = 0; i < props.module.customCss.length; i++) {
      const element: any = props.module.customCss[i];
      if ('moduleTitle' === element.prop) {
        titleMarginBottom.value = element.css?.margin?.bottom || 0;
      }
    }

    const top = paddingTop + titleHeight.value + titleMarginBottom.value;
    const height = `calc(100% - ${top}px)`;
    const left = paddingLeft;
    return {
      height: height,
      top: `${top}px`,
      left: `${left}px`
    };
  });
</script>
<style lang="scss" scoped>
  .left {
    position: absolute;
    .img-1 {
      width: 45px;
    }
    .moduleborder {
      position: absolute;
      top: 3px;
      left: 22px;
      height: 100%;
      width: 8px;
    }
  }
</style>
