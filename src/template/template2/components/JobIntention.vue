<!-- 求职意向 -->
<template>
  <div class="job-intention">
    <model-title :title="modelData.title" :iconfont="modelData.iconfont"></model-title>
    <!-- 求职意向 -->
    <ul>
      <!-- 求职类型 -->
      <li v-show="modelData.isShow.jobSearchType">
        <svg-icon iconName="icon-gongzuoleixing" className="icon" color="#757575"></svg-icon>
        {{ modelData.jobSearchType }}</li
      >
      <!-- 意向岗位 -->
      <li v-show="modelData.isShow.intendedPositions">
        <svg-icon iconName="icon-yixianggangwei" className="icon" color="#757575"></svg-icon
        >{{ modelData.intendedPositions }}</li
      >
      <!-- 意向城市 -->
      <li v-show="modelData.isShow.intendedCity"
        ><svg-icon iconName="icon-didiandingwei" className="icon" color="#757575"></svg-icon
        >{{ modelData.intendedCity }}</li
      >
      <!-- 期望薪资 -->
      <li v-show="modelData.isShow.expectSalary"
        ><svg-icon iconName="icon-nianduxinchou" className="icon" color="#757575"></svg-icon
        >{{ modelData.expectSalary }}</li
      >
      <!-- 求职状态 -->
      <li v-show="modelData.isShow.jobStatus"
        ><svg-icon iconName="icon-ruzhiriqi" className="icon" color="#757575"></svg-icon
        >{{ modelData.jobStatus }}</li
      >
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { IJOBINTENTION } from '@/interface/model';
  import ModelTitle from './ModelTitle.vue';
  const props = defineProps<{
    modelData: IJOBINTENTION;
  }>();
  props.modelData.isShow.jobSearchType = false
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
