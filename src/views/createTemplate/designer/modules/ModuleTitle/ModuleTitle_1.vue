<template>
  <div class="model-title-box" :style="moduleTitleStyle">
    <div class="title-box">
      <h1 :style="moduleTitleFontStyle">{{ module.title }}</h1>
    </div>
    <!-- 两个平行四边形 -->
    <div class="lozenge-1"></div>
    <div class="lozenge-2"></div>
  </div>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';

  const props = defineProps<{
    module: IModule;
  }>();

  // 返回模块整体样式
  const moduleTitleStyle = useGetCustomStyle(props.module, 'moduleTitle');
  console.log('模块整体样式', moduleTitleStyle);

  // 返回标题样式
  const moduleTitleFontStyle = useGetCustomStyle(props.module, 'moduleTitleFont');
</script>
<style lang="scss" scoped>
  .model-title-box {
    .title-box {
      width: 165px;
      height: 100%;
      position: relative;
      background-color: v-bind('moduleTitleStyle.themeColor');
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(225deg, transparent 22px, v-bind('moduleTitleStyle.themeColor') 0)
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
        border-color: transparent transparent v-bind('moduleTitleStyle.themeColor');
        transform: rotate(-90deg);
      }
    }

    .lozenge-1 {
      width: 5px;
      height: 100%;
      background-color: v-bind('moduleTitleStyle.themeColor');
      transform: skewX(45deg);
      margin-left: -10px;
    }
    .lozenge-2 {
      width: 10px;
      height: 100%;
      background-color: v-bind('moduleTitleStyle.themeColor');
      transform: skewX(45deg);
      margin-left: 5px;
    }
  }
</style>
