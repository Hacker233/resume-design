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
  import { IHOBBIES } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import ModelTitle from '../../ModelTitle/ModelTitle1/ModelTitle1.vue';
  defineProps<{
    modelData: IHOBBIES;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
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
