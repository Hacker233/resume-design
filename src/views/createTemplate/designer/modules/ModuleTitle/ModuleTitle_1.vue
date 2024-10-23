<template>
  <div class="model-title-box" :style="moduleTitleStyle">
    <div class="title-box">
      <hj-h1-1 :title="module.title" :style="moduleTitleFontStyle"></hj-h1-1>
    </div>
    <!-- 两个平行四边形 -->
    <div class="lozenge-1"></div>
    <div class="lozenge-2"></div>

    <!-- 左侧竖线 -->
    <div class="left-line" :style="lineStyle"></div>
  </div>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';
  import HjH11 from '../components/hj-h1-1.vue';

  const props = defineProps<{
    module: IModule;
  }>();

  // 返回模块整体样式
  const moduleTitleStyle: any = useGetCustomStyle(props.module, 'moduleTitle');

  // 返回标题样式
  const moduleTitleFontStyle = useGetCustomStyle(props.module, 'moduleTitleFont');

  // 返回线的样式
  const lineStyle: any = computed(() => {
    const paddingTop = props.module.css.padding.top || 0;
    const paddingBottom = props.module.css.padding.bottom || 0;
    const height = paddingTop + paddingBottom + 'px';
    return {
      position: 'absolute',
      height: `calc(100% - ${height})`,
      width: '1px',
      left: '49px',
      top: height
    };
  });
</script>
<style lang="scss" scoped>
  .model-title-box {
    .title-box {
      width: 165px;
      height: 100%;
      position: relative;
      background-color: v-bind('moduleTitleStyle.borderColor');
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(
          225deg,
          transparent 22px,
          v-bind('moduleTitleStyle.borderColor') 0
        )
        top right;
      &::after {
        content: '';
        position: absolute;
        left: 8px;
        bottom: -18px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 25px 10px;
        border-color: transparent transparent v-bind('moduleTitleStyle.borderColor');
        transform: rotate(-90deg);
      }
    }

    .lozenge-1 {
      width: 5px;
      height: 100%;
      background-color: v-bind('moduleTitleStyle.borderColor');
      transform: skewX(45deg);
      margin-left: -10px;
    }
    .lozenge-2 {
      width: 10px;
      height: 100%;
      background-color: v-bind('moduleTitleStyle.borderColor');
      transform: skewX(45deg);
      margin-left: 5px;
    }
    .left-line {
      background-color: v-bind('moduleTitleStyle.borderColor');
    }
  }
</style>
