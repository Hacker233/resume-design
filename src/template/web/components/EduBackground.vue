<template>
  <div class="edu-background">
    <!-- 标题 -->
    <model-title :title="eduBackground.title"></model-title>
    <!-- 教育背景 -->
    <div class="edu-list">
      <ul v-for="(item, index) in eduBackground.LIST" :key="index">
        <!-- 学历日期 -->
        <li>{{ item.date }}</li>
        <!-- 学校名称 -->
        <li>{{ item.schoolName }}</li>
        <!-- 专业 -->
        <li>{{ item.specialized }}</li>
        <!-- 学历 -->
        <li>{{ item.degree }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IEDUBACKGROUND } from '@/types/model';
  import ModelTitle from './ModelTitle.vue';
  defineProps<{
    eduBackground: IEDUBACKGROUND;
  }>();
</script>
<style lang="less" scoped>
  .edu-background {
    padding: 0 40px;
    margin-bottom: 45px;
    .edu-list {
      display: flex;
      width: 100%;
      flex-direction: column;
      margin-top: 25px;

      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          list-style: none;
          font-size: @primary-text-font-size;
          color: @primary-sub-title-color;
          font-weight: bold;
        }
        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
