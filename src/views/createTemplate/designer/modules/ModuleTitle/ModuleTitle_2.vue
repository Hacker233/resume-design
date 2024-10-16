<template>
  <div class="model-title-9-box" :style="moduleTitleStyle">
    <!-- 图标 -->
    <div class="title-icon-box">
      <svg-icon
        :icon-name="module.props.title.iconfont"
        :color="moduleTitleFontStyle.color"
        size="30px"
      ></svg-icon>
    </div>
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
</script>
<style lang="scss" scoped>
  .model-title-9-box {
    .title-icon-box {
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      position: relative;
      width: 100%;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 35%;
        height: 0;
        border-bottom: 1px dashed v-bind('moduleTitleFontStyle.color');
        transform: translate(0, -50%);
      }
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        width: 35%;
        height: 0;
        border-bottom: 1px dashed v-bind('moduleTitleFontStyle.color');
        transform: translate(0, -50%);
      }
    }
  }
</style>
