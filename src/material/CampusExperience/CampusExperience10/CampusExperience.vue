<!-- 校园经历 -->
<template>
  <div class="campus-experience">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 内容区域 -->
    <div class="campus-experience-10-content-box">
      <!-- 左侧 -->
      <div class="left">
        <img src="@/assets/images/modulelist.png" alt="列表" />
        <img class="moduleborder" src="@/assets/images/moduleborder.png" alt="边框" />
      </div>
      <!-- 校园经历 -->
      <campus-experience1-vue
        :model-data="modelData"
        :model-style="modelStyle"
      ></campus-experience1-vue>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ICAMPUSEXPERIENCE } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import ModelTitle from '@/material/ModelTitle/ModelTitle9/ModelTitle.vue';
  import CampusExperience1Vue from '@/material/Common/CampusExperience/CampusExperience1.vue';
  defineProps<{
    modelData: ICAMPUSEXPERIENCE;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .campus-experience {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    .campus-experience-10-content-box {
      display: flex;
      margin-top: 25px;
      justify-content: space-between;
      .left {
        width: 74px;
        position: relative;
        .moduleborder {
          position: absolute;
          top: 3px;
          left: 22px;
          height: 100%;
        }
      }
      :deep(.campus-experience-content) {
        flex: 1;
        .campue-experience-list {
          padding: 0;
        }
      }
    }
  }
</style>
