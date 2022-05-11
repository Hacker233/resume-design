<template>
  <div class="job-intention">
    <!-- 标题 -->
    <model-title :title="jobIntention.title"></model-title>
    <!-- 求职意向 -->
    <ul>
      <!-- 求职类型 -->
      <li>{{jobIntention.jobSearchType}}</li>
      <!-- 意向岗位 -->
      <li>{{jobIntention.intendedPositions}}</li>
      <!-- 意向城市 -->
      <li>{{jobIntention.intendedCity}}</li>
      <!-- 期望薪资 -->
      <li>{{jobIntention.expectSalary}}</li>
      <!-- 求职状态 -->
      <li>{{jobIntention.jobStatus}}</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { IJOBINTENTION } from '@/types/model';
  import ModelTitle from './ModelTitle.vue';
  defineProps<{
    jobIntention: IJOBINTENTION;
  }>();
</script>
<style lang="less" scoped>
  .job-intention {
    padding: 0 40px;
    margin-bottom: 45px;
    ul {
      display: flex;
      margin-top: 25px;
      justify-content: space-between;
      li {
        list-style: none;
        font-size: @primary-text-font-size;
        color: @primary-text-color;
      }
    }
  }
</style>
