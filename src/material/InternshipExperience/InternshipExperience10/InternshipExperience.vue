<!-- 实习经验 -->
<template>
  <div class="internship-experience">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 内容区域 -->
    <div class="internship-experience-10-content-box">
      <!-- 左侧 -->
      <div class="left">
        <img src="@/assets/images/modulelist.png" alt="列表" />
        <img class="moduleborder" src="@/assets/images/moduleborder.png" alt="边框" />
      </div>
      <!-- 校园经历 -->
      <internship-experience1-vue
        :model-data="modelData"
        :model-style="modelStyle"
      ></internship-experience1-vue>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IINTERNSHIPEXPERIENCE } from '@/interface/model';
  import ModelTitle from '@/material/ModelTitle/ModelTitle9/ModelTitle.vue';
  import IMODELSTYLE from '@/interface/modelStyle';
  import InternshipExperience1Vue from '@/material/Common/InternshipExperience/InternshipExperience1.vue';
  defineProps<{
    modelData: IINTERNSHIPEXPERIENCE;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .internship-experience {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    .internship-experience-10-content-box {
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
      :deep(.internship-experience-content) {
        flex: 1;
        .internship-experience-list {
          padding: 0;
        }
      }
    }
  }
</style>
