<template>
  <div class="edu-background">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 教育背景 -->
    <div class="edu-list">
      <ul v-for="(item, index) in modelData.LIST" :key="index" class="list-item">
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
  import ModelTitle from '../../ModelTitle/ModelTitle1/ModelTitle1.vue';
  import { formatDate } from '@/utils/common';
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    modelData: IEDUBACKGROUND;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .edu-background {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    box-sizing: border-box;
    .edu-list {
      display: flex;
      width: 100%;
      flex-direction: column;
      margin-top: 25px;

      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & :first-child {
          min-width: 165px;
        }
        li {
          list-style: none;
          font-size: v-bind('modelStyle.titleFontSize');
          color: v-bind('modelStyle.titleColor');
          font-weight: v-bind('modelStyle.titleFontWeight');
          letter-spacing: 2px;
        }
        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
