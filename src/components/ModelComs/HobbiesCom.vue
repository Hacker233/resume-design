<!-- 兴趣爱好 -->
<template>
  <div class="hobbies">
    <!-- 标题 -->
    <slot name="model-title"></slot>
    <!-- 兴趣爱好 -->
    <div class="hobbies-content">
      <p v-dompurify-html="modelData.content"></p>
    </div>
  </div>
</template>
<script setup lang="ts">
  import useGetLineLeft from '@/hooks/material/useTemplate3LeftLine';
  import { IHOBBIES } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  const props = defineProps<{
    modelData: IHOBBIES;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
  // 模板3左侧竖线
  const { left } = useGetLineLeft(props.modelStyle);
</script>
<style lang="scss" scoped>
  .hobbies {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    box-sizing: border-box;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 100%;
      background-color: v-bind('modelStyle.themeColor');
      left: v-bind('left');
      top: 5px;
    }
    .hobbies-content {
      display: flex;
      margin-top: 25px;
      p {
        letter-spacing: 2px;
        font-size: v-bind('modelStyle.textFontSize');
        color: v-bind('modelStyle.textColor');
        font-weight: v-bind('modelStyle.textFontWeight');
        line-height: 1.5;
      }
    }
  }
</style>
