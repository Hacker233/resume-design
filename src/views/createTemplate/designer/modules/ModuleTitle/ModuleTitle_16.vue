<template>
  <div class="module-title-16" :style="moduleTitleStyle">
    <hj-h1-1
      class="module-title-h1-16"
      :title="module.title"
      :style="moduleTitleFontStyle"
    ></hj-h1-1>
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
  .module-title-h1-16 {
    &::before {
      content: '';
      position: absolute;
      left: 11px;
      display: inline-block;
      width: 4px;
      height: 100%;
      background-color: #fff;
    }
    &::after {
      content: '';
      position: absolute;
      left: 26px;
      display: inline-block;
      width: 4px;
      height: 100%;
      background-color: #fff;
    }
  }
</style>
