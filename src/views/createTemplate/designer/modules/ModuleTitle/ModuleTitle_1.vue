<template>
  <div ref="moduleTitleRef" class="model-title-box" :style="moduleTitleStyle">
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

  // 返回左侧竖线样式
  const moduleTitleRef = ref<any>(null);
  // const iconBoxRef = ref<any>(null);
  const moduleTitleHalf = ref<number>(0);
  // const iconBoxHalf = ref<number>(0);
  const lineStyle: any = computed(() => {
    const paddingTop = props.module.css.padding.top || 0; // 组件上边距
    const paddingLeft = props.module.css.padding.left || 0; // 组件左侧内边距
    // 获取标题高度一半
    if (moduleTitleRef.value) {
      moduleTitleHalf.value = moduleTitleRef.value.clientHeight / 2;
    }
    // 获取iconBox宽度一半
    // if (iconBoxRef.value) {
    //   console.log('标题高度', iconBoxRef.value.clientWidth);
    //   iconBoxHalf.value = iconBoxRef.value.clientWidth / 2;
    // }
    const top = moduleTitleHalf.value + paddingTop;
    const height = `calc(100% - ${top}px)`;
    const left = paddingLeft + 24;
    return {
      height: height,
      top: `${top}px`,
      left: `${left}px`
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
      position: absolute;
      width: 1px;
      background: v-bind('moduleTitleStyle.borderColor');
    }
  }
</style>
