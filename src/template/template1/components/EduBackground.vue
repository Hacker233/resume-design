<template>
  <div class="edu-background">
    <!-- 标题 -->
    <model-title :title="data.title"></model-title>
    <!-- 教育背景 -->
    <div class="edu-list">
      <ul v-for="(item, index) in data.LIST" :key="index">
        <!-- 学历日期 -->
        <li v-if="data.isShow.date">{{ formatDate(item.date) }}</li>
        <!-- 学校名称 -->
        <li v-if="data.isShow.schoolName">{{ item.schoolName }}</li>
        <!-- 专业 -->
        <li v-if="data.isShow.specialized">{{ item.specialized }}</li>
        <!-- 学历 -->
        <li v-if="data.isShow.degree">{{ item.degree }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IEDUBACKGROUND } from '@/interface/model';
  import ModelTitle from './ModelTitle.vue';
  import { formatDate } from '@/utils/common';
  import { IMATERIALITEM } from '@/interface/material';
  defineProps<{
    modelData: IMATERIALITEM;
    data: IEDUBACKGROUND;
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
          font-size: v-bind('modelData.style.textFontSize');
          color: v-bind('modelData.style.textColor');
          font-weight: v-bind('modelData.style.textFontWeight');
          letter-spacing: 2px;
        }
        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
