<!-- 求职意向 -->
<template>
  <div class="job-intention">
    <model-title :title="data.title" :iconfont="data.iconfont"></model-title>
    <!-- 求职意向 -->
    <ul>
      <!-- 求职类型 -->
      <li v-show="data.isShow.jobSearchType">
        <svg-icon icon-name="icon-gongzuoleixing" class-name="icon" color="#757575"></svg-icon>
        {{ data.jobSearchType }}</li
      >
      <!-- 意向岗位 -->
      <li v-show="data.isShow.intendedPositions">
        <svg-icon icon-name="icon-yixianggangwei" class-name="icon" color="#757575"></svg-icon
        >{{ data.intendedPositions }}</li
      >
      <!-- 意向城市 -->
      <li v-show="data.isShow.intendedCity"
        ><svg-icon icon-name="icon-didiandingwei" class-name="icon" color="#757575"></svg-icon
        >{{ data.intendedCity }}</li
      >
      <!-- 期望薪资 -->
      <li v-show="data.isShow.expectSalary"
        ><svg-icon icon-name="icon-nianduxinchou" class-name="icon" color="#757575"></svg-icon
        >{{ data.expectSalary }}</li
      >
      <!-- 求职状态 -->
      <li v-show="data.isShow.jobStatus"
        ><svg-icon icon-name="icon-ruzhiriqi" class-name="icon" color="#757575"></svg-icon
        >{{ data.jobStatus }}</li
      >
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { IMATERIALITEM } from '@/interface/material';
  import { IJOBINTENTION } from '@/interface/model';
  import ModelTitle from './ModelTitle.vue';
  const props = defineProps<{
    modelData: IMATERIALITEM;
    data: IJOBINTENTION;
  }>();
  props.data.isShow.jobSearchType = false;
</script>
<style lang="scss" scoped>
  .job-intention {
    margin-top: v-bind('modelData.style.mTop');
    margin-bottom: v-bind('modelData.style.mBottom');
    ul {
      display: flex;
      margin-top: 25px;
      justify-content: space-between;
      li {
        list-style: none;
        font-size: v-bind('modelData.style.textFontSize');
        color: v-bind('modelData.style.textColor');
        font-weight: v-bind('modelData.style.textFontWeight');
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
