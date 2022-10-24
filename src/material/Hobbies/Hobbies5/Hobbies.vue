<!-- 兴趣爱好 -->
<template>
  <div class="hobbies">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
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
  import ModelTitle from '@/material/ModelTitle/ModelTitle5/ModelTitle.vue';
  const props = defineProps<{
    modelData: IHOBBIES;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();

  const { left } = useGetLineLeft(props.modelStyle, -23);
</script>
<style lang="scss" scoped>
  .hobbies {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
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
      padding: 30px 30px 10px 50px;
      box-sizing: border-box;
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
