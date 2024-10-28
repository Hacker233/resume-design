<template>
  <div class="module-title-3" :style="moduleTitleStyle">
    <div ref="titleRef">
      <hj-h1-1 :title="module.title" :style="moduleTitleFontStyle"></hj-h1-1>
    </div>
    <!-- 右侧线条以及图标 -->
    <div :style="moduleTitleRightBox">
      <!-- 图标 -->
      <div ref="iconBoxRef" :style="moduleTitleIcon">
        <svg-icon
          :icon-name="module.props.title.iconfont"
          :color="moduleTitleIcon.color"
          size="14px"
        ></svg-icon>
      </div>
    </div>
    <!-- 左侧竖线 -->
    <div class="left-line" :style="lineStyle"></div>
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

  // 返回模块图标样式
  const moduleTitleIcon = useGetCustomStyle(props.module, 'moduleTitleIcon');

  // 返回标题字体样式
  const moduleTitleFontStyle = useGetCustomStyle(props.module, 'moduleTitleFont');

  // 返回标题右侧线条样式
  const moduleTitleRightBox = useGetCustomStyle(props.module, 'moduleTitleRightBox');

  // 返回左侧竖线样式
  const titleRef = ref<any>(null);
  const titleWidth = ref<number>(0);
  const iconBoxRef = ref<any>(null);
  const lineStyle: any = computed(() => {
    const paddingTop = props.module.css.padding.top || 0; // 组件上边距
    const paddingLeft = props.module.css.padding.left || 0; // 组件左侧内边距
    // 获取左侧标题宽度
    if (titleRef.value) {
      titleWidth.value = titleRef.value.clientWidth;
    }
    const top = paddingTop;
    const height = `calc(100% - ${top}px)`;
    const left = paddingLeft + titleWidth.value;
    return {
      height: height,
      top: `${top}px`,
      left: `${left}px`
    };
  });
</script>
<style lang="scss" scoped>
  .left-line {
    position: absolute;
    width: 1px;
    background: v-bind('moduleTitleStyle.borderColor');
  }
</style>
