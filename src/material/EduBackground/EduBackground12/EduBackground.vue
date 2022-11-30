<template>
  <div class="edu-background-12-box">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 内容区域 -->
    <div class="edubackground-11-content-box">
      <!-- 左侧 -->
      <div class="left">
        <img src="@/assets/images/modulelist.png" alt="列表" />
        <img class="moduleborder" src="@/assets/images/moduleborder.png" alt="边框" />
      </div>
      <edu-background1-vue :model-data="modelData" :model-style="modelStyle"></edu-background1-vue>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IEDUBACKGROUND } from '@/interface/model';
  import ModelTitle from '@/material/ModelTitle/ModelTitle9/ModelTitle.vue';
  import IMODELSTYLE from '@/interface/modelStyle';
  import EduBackground1Vue from '@/material/Common/EduBackground/EduBackground2.vue';
  defineProps<{
    modelData: IEDUBACKGROUND;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .edu-background-12-box {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    margin-top: v-bind('modelStyle.mTop');
    margin-bottom: v-bind('modelStyle.mBottom');
    box-sizing: border-box;
    .edubackground-11-content-box {
      display: flex;
      margin-top: 15px;
      justify-content: space-between;

      :deep(.edu-background-content) {
        flex: 1;
      }
      .left {
        width: 74px;
        margin-top: 12px;
        position: relative;
        .moduleborder {
          position: absolute;
          top: 3px;
          left: 22px;
          height: 100%;
        }
      }
    }
  }
</style>
