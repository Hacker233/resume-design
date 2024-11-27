<template>
  <div ref="moduleTitleRef" class="module-title-3" :style="moduleTitleStyle">
    <div ref="iconBoxRef" class="icon-box" :style="moduleTitleIconStyle">
      <svg-icon
        :icon-name="module.props.title.iconfont"
        :color="moduleTitleIconStyle.color"
        :size="moduleTitleIconStyle.fontSize"
      ></svg-icon>
    </div>
    <!-- 竖线 -->
    <div class="line" :style="lineStyle"></div>
    <hj-h1-1 :title="module.title" :style="moduleTitleFontStyle"></hj-h1-1>
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

  // 返回图标样式
  const moduleTitleIconStyle = useGetCustomStyle(props.module, 'moduleTitleIcon');

  // 返回左侧竖线样式
  const moduleTitleRef = ref<any>(null);
  const iconBoxRef = ref<any>(null);
  const moduleTitleHalf = ref<number>(0);
  const iconBoxHalf = ref<number>(0);
  const lineStyle: any = computed(() => {
    const paddingTop = props.module.css.padding.top || 0; // 组件上边距
    const paddingLeft = props.module.css.padding.left || 0; // 组件左侧内边距
    const background = props.module.css.themeColor;
    // 获取标题高度一半
    if (moduleTitleRef.value) {
      moduleTitleHalf.value = moduleTitleRef.value.clientHeight / 2;
    }
    // 获取iconBox宽度一半
    if (iconBoxRef.value) {
      console.log('标题高度', iconBoxRef.value.clientWidth);
      iconBoxHalf.value = iconBoxRef.value.clientWidth / 2;
    }
    const top = moduleTitleHalf.value + paddingTop;
    const height = `calc(100% - ${top}px)`;
    const left = paddingLeft + iconBoxHalf.value;
    return {
      height: height,
      top: `${top}px`,
      left: `${left}px`,
      background: background
    };
  });
</script>
<style lang="scss" scoped>
  .line {
    position: absolute;
    width: 1px;
  }
</style>
