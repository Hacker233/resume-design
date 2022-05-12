<!-- 校园经历 -->
<template>
  <div class="campus-experience">
    <!-- 标题 -->
    <model-title :title="campusExperience.title"></model-title>
    <!-- 校园经历 -->
    <div class="campue-experience-list">
      <div class="list" v-for="(item, index) in campusExperience.LIST" :key="index">
        <ul>
          <!-- 经历时间 -->
          <li>{{ item.date }}</li>
          <!-- 项目名称 -->
          <li>{{ item.campusBriefly }}</li>
          <!-- 主要职责 -->
          <li>{{ item.campusDuty }}</li>
        </ul>
        <!-- 简述 -->
        <p>{{ item.campusContent }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ICAMPUSEXPERIENCE } from '@/types/model';
  import ModelTitle from './ModelTitle.vue';
  defineProps<{
    campusExperience: ICAMPUSEXPERIENCE;
  }>();
</script>
<style lang="less" scoped>
  .campus-experience {
    padding: 0 40px;
    margin-bottom: 45px;
    .campue-experience-list {
      margin-top: 25px;
      .list {
        display: flex;
        flex-direction: column;
        &:not(:last-child) {
          margin-bottom: 25px;
        }
        ul {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          li {
            list-style: none;
            font-size: @primary-text-font-size;
            color: @primary-sub-title-color;
            font-weight: bold;
            letter-spacing: 2px;
          }
        }
        p {
          letter-spacing: 2px;
          font-size: @primary-text-font-size;
          color: @primary-text-color;
          line-height: 1.5;
        }
      }
    }
  }
</style>
