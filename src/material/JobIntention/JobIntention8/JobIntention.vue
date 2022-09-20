<template>
  <div class="job-intention-7">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 内容区域 -->
    <div class="model-border-box">
      <div class="icon-box">
        <svg-icon :icon-name="modelData.iconfont" color="#fff" size="15px"></svg-icon>
      </div>
      <job-intention1 :model-data="modelData" :model-style="modelStyle"></job-intention1>
    </div>
  </div>
</template>
<script setup lang="ts">
  import ModelTitle from '@/material/ModelTitle/ModelTitle7/ModelTitle.vue';
  import { IJOBINTENTION } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import JobIntention1 from '../../Common/JobIntention/JobIntention1.vue';
  defineProps<{
    modelData: IJOBINTENTION;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .job-intention-7 {
    padding-top: 10px;
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    margin-top: v-bind('modelStyle.mTop');
    margin-bottom: v-bind('modelStyle.mBottom');
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
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
      :deep(.job-intention-content) {
        flex: 1;
        ul {
          padding: 0;
        }
      }
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
    }
  }
</style>
