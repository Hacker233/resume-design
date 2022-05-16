<template>
  <div class="job-intention">
    <!-- 标题 -->
    <model-title :title="modelData.title"></model-title>
    <!-- 求职意向 -->
    <ul>
      <!-- 求职类型 -->
      <li v-show="modelData.isShow.jobSearchType">{{modelData.jobSearchType}}</li>
      <!-- 意向岗位 -->
      <li v-show="modelData.isShow.intendedPositions">{{modelData.intendedPositions}}</li>
      <!-- 意向城市 -->
      <li v-show="modelData.isShow.intendedCity">{{modelData.intendedCity}}</li>
      <!-- 期望薪资 -->
      <li v-show="modelData.isShow.expectSalary">{{modelData.expectSalary}}</li>
      <!-- 求职状态 -->
      <li v-show="modelData.isShow.jobStatus">{{modelData.jobStatus}}</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { IJOBINTENTION } from '@/types/model';
  import ModelTitle from './ModelTitle.vue';
  defineProps<{
    modelData: IJOBINTENTION;
  }>();
</script>
<style lang="less" scoped>
  .job-intention {
    padding: 0 40px;
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
      }
    }
  }
</style>
