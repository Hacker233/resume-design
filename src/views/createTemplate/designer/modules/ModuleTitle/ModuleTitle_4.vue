<template>
  <div class="module-title-3" :style="moduleTitleStyle">
    <div class="icon-box" :style="moduleTitleIconStyle">
      <svg-icon
        :icon-name="module.props.title.iconfont"
        :color="moduleTitleIconStyle.color"
        :size="moduleTitleIconStyle.fontSize"
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

  // 返回图标样式
  const moduleTitleIconStyle = useGetCustomStyle(props.module, 'moduleTitleIcon');
</script>
<style lang="scss" scoped>
  .icon-box {
    background-color: v-bind('moduleTitleStyle.borderColor');
  }
</style>
