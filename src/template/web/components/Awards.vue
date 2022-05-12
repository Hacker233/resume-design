<!-- 荣誉奖项 -->
<template>
  <div class="awards">
    <!-- 标题 -->
    <model-title :title="awards.title"></model-title>
    <!-- 荣誉奖项 -->
    <div class="awards-list">
      <ul v-for="(item, index) in awards.LIST" :key="index">
        <!-- 获奖日期 -->
        <li>{{ item.date }}</li>
        <!-- 奖项名称 -->
        <li>{{ item.awardsName }}</li>
        <!-- 奖项等级 -->
        <li>{{ item.awardsGrade }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IAWARDS } from '@/types/model';
  import ModelTitle from './ModelTitle.vue';
  defineProps<{
    awards: IAWARDS;
  }>();
</script>
<style lang="less" scoped>
  .awards {
    padding: 0 40px;
    margin-bottom: 45px;
    .awards-list {
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
          letter-spacing: 2px;
        }
        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
