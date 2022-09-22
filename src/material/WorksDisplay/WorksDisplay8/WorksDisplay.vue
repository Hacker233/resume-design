<!-- 作品展示 -->
<template>
  <div class="works-display">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 作品展示 -->
    <div class="model-border-box">
      <div class="icon-box">
        <svg-icon :icon-name="modelData.iconfont" color="#fff" size="15px"></svg-icon>
      </div>
      <works-display1-vue :model-data="modelData" :model-style="modelStyle"></works-display1-vue>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IWORKSDISPLAY } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import ModelTitle from '@/material/ModelTitle/ModelTitle7/ModelTitle.vue';
  import WorksDisplay1Vue from '@/material/Common/WorksDisplay/WorksDisplay1.vue';
  defineProps<{
    modelData: IWORKSDISPLAY;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .works-display {
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
      :deep(.works-display-content) {
        flex: 1;
        .works-display-list {
          padding: 0;
        }
      }
    }
  }
</style>
