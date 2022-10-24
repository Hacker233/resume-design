<!-- 教育背景 -->
<template>
  <div class="edu-background">
    <!-- 标题 -->
    <model-title :title="modelData.title" :iconfont="modelData.iconfont" :model-style="modelStyle">
    </model-title>
    <!-- 教育背景 -->
    <div class="model-border-box">
      <div class="icon-box">
        <svg-icon :icon-name="modelData.iconfont" color="#fff" size="15px"></svg-icon>
      </div>
      <edu-background1-vue :model-data="modelData" :model-style="modelStyle"></edu-background1-vue>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IEDUBACKGROUND } from '@/interface/model';
  import ModelTitle from '@/material/ModelTitle/ModelTitle7/ModelTitle.vue';
  import IMODELSTYLE from '@/interface/modelStyle';
  import EduBackground1Vue from '@/material/Common/EduBackground/EduBackground1.vue';
  defineProps<{
    modelData: IEDUBACKGROUND;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .edu-background {
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
      :deep(.edu-background-content) {
        flex: 1;
        .edu-list {
          .list-item {
            padding: 0;
            margin-bottom: 20px;
            .start-end-date {
              position: absolute;
              left: -165px;
            }
          }
        }
      }
    }
  }
</style>
