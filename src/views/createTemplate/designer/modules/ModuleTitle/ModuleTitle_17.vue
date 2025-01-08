<template>
  <div class="module-title-15" :style="moduleTitleStyle">
    <hj-h1-1 :title="module.title" :style="moduleTitleFontStyle"></hj-h1-1>
    <!-- 三角形 -->
    <div class="triangle" :style="triangleStyle"></div>
    <!-- 右侧线条 -->
    <div class="right-line" :style="rightLine"></div>
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
  // 返回右侧线条样式
  const moduleTitleRightLine: any = useGetCustomStyle(props.module, 'moduleTitleRightLine');

  // 返回标题字体样式
  const moduleTitleFontStyle = useGetCustomStyle(props.module, 'moduleTitleFont');

  // 返回三角形样式
  const triangleStyle: any = computed(() => {
    const borderColor =
      moduleTitleFontStyle.value.backgroundColor || moduleTitleFontStyle.value.background;
    const borderHeight = moduleTitleStyle.value.height;
    return {
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: `${borderHeight} 0 0 ${borderHeight}`,
      borderColor: `transparent transparent transparent ${borderColor}`
    };
  });

  const rightLine = computed(() => {
    const height = moduleTitleRightLine.value.height;
    return {
      ...moduleTitleRightLine.value,
      clipPath: `polygon(1% 1%, 100% 1%, 100% 100%, ${height} 100%, 0 0)`
    };
  });
</script>
<style lang="scss" scoped>
  .module-title-15 {
    .right-line {
      clip-path: polygon(1% 1%, 100% 1%, 100% 100%, 4% 100%, 0 0);
    }
  }
</style>
