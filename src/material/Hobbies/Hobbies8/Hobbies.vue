<!-- 兴趣爱好 -->
<template>
  <div class="hobbies">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 兴趣爱好 -->
    <div class="model-border-box">
      <div class="icon-box">
        <svg-icon :icon-name="modelData.iconfont" color="#fff" size="15px"></svg-icon>
      </div>
      <hobbies1-vue :model-data="modelData" :model-style="modelStyle"></hobbies1-vue>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IHOBBIES } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import ModelTitle from '@/material/ModelTitle/ModelTitle7/ModelTitle.vue';
  import Hobbies1Vue from '@/material/Common/Hobbies/Hobbies1.vue';
  defineProps<{
    modelData: IHOBBIES;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .hobbies {
    padding-top: 10px;
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    margin-top: v-bind('modelStyle.mTop');
    margin-bottom: v-bind('modelStyle.mBottom');
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    :deep(.model-title-box) {
      width: 165px;
    }
    .model-border-box {
      flex: 1;
      height: 100%;
      border-left: 1px solid v-bind('modelStyle.themeColor');
      border-top: 1px solid v-bind('modelStyle.themeColor');
      padding-bottom: v-bind('modelStyle.pBottom');
      padding-top: v-bind('modelStyle.pTop');
      padding-left: 20px;
      box-sizing: border-box;
      position: relative;
      .icon-box {
        position: absolute;
        left: -13px;
        top: -13px;
        width: 26px;
        height: 26px;
        background-color: v-bind('modelStyle.themeColor');
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
      }
      :deep(.hobbies-content) {
        flex: 1;
        padding: 0;
      }
    }
  }
</style>
