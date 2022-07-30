<template>
  <div class="edu-background">
    <!-- 标题 -->
    <model-title :title="modelData.title"></model-title>
    <!-- 教育背景 -->
    <div class="edu-list">
      <ul v-for="(item, index) in modelData.LIST" :key="index">
        <!-- 学历日期 -->
        <li v-if="modelData.isShow.date">{{ formatDate(item.date) }}</li>
        <!-- 学校名称 -->
        <li v-if="modelData.isShow.schoolName">{{ item.schoolName }}</li>
        <!-- 专业 -->
        <li v-if="modelData.isShow.specialized">{{ item.specialized }}</li>
        <!-- 学历 -->
        <li v-if="modelData.isShow.degree">{{ item.degree }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IEDUBACKGROUND } from '@/interface/model';
  import ModelTitle from './ModelTitle.vue';
  import { formatDate } from '@/utils/common';
  defineProps<{
    modelData: IEDUBACKGROUND;
  }>();
</script>
<style lang="scss" scoped>
  .edu-background {
    padding: 0 40px;
    margin-bottom: v-bind('modelData.style.mBottom');
    margin-top: v-bind('modelData.style.mTop');
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
          font-size: v-bind('modelData.style.titleFontSize');
          color: v-bind('modelData.style.titleColor');
          font-weight: v-bind('modelData.style.titleFontWeight');
          letter-spacing: 2px;
        }
        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
