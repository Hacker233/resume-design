<!-- 求职意向 -->
<template>
  <div class="job-intention">
    <model-title
      :title="modelData.title"
      :iconfont="modelData.iconfont"
      :model-style="modelStyle"
    ></model-title>
    <!-- 求职意向 -->
    <ul>
      <!-- 求职类型 -->
      <li v-show="modelData.isShow.jobSearchType">
        <svg-icon icon-name="icon-gongzuoleixing" class-name="icon" color="#757575"></svg-icon>
        {{ modelData.jobSearchType }}</li
      >
      <!-- 意向岗位 -->
      <li v-show="modelData.isShow.intendedPositions">
        <svg-icon icon-name="icon-yixianggangwei" class-name="icon" color="#757575"></svg-icon
        >{{ modelData.intendedPositions }}</li
      >
      <!-- 意向城市 -->
      <li v-show="modelData.isShow.intendedCity"
        ><svg-icon icon-name="icon-didiandingwei" class-name="icon" color="#757575"></svg-icon
        >{{ modelData.intendedCity }}</li
      >
      <!-- 期望薪资 -->
      <li v-show="modelData.isShow.expectSalary"
        ><svg-icon icon-name="icon-nianduxinchou" class-name="icon" color="#757575"></svg-icon
        >{{ modelData.expectSalary }}</li
      >
      <!-- 求职状态 -->
      <li v-show="modelData.isShow.jobStatus"
        ><svg-icon icon-name="icon-ruzhiriqi" class-name="icon" color="#757575"></svg-icon
        >{{ modelData.jobStatus }}</li
      >
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { IJOBINTENTION } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import ModelTitle from '@/material/ModelTitle/ModelTitle8/ModelTitle.vue';
  defineProps<{
    modelData: IJOBINTENTION;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();

  // props.modelData.isShow.jobSearchType = false;
</script>
<style lang="scss" scoped>
  .job-intention {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    box-sizing: border-box;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        list-style: none;
        font-size: v-bind('modelStyle.textFontSize');
        color: v-bind('modelStyle.textColor');
        font-weight: v-bind('modelStyle.textFontWeight');
        letter-spacing: 2px;
        display: flex;
        align-items: center;
        .icon {
          margin-right: 8px;
          font-size: 17px;
        }
      }
    }
  }
</style>
