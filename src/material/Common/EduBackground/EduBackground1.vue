<!-- 教育背景 -->
<template>
  <div class="edu-background-content">
    <!-- 教育背景 -->
    <div class="edu-list">
      <div v-for="(item, index) in modelData.LIST" :key="index" class="list-item">
        <!-- 日期和学校 -->
        <div class="date-school-box">
          <span v-if="modelData.isShow.date" class="start-end-date">
            {{ formatDate(item.date) }}
          </span>
          <span v-if="modelData.isShow.schoolName">
            {{ item.schoolName }}
          </span>
          <span v-if="modelData.isShow.degree">
            {{ item.degree }}
          </span>
        </div>
        <!-- 专业 -->
        <p v-if="modelData.isShow.specialized" class="special">{{ item.specialized }}</p>
        <!-- 教学经历 -->
        <p
          v-if="modelData.isShow.majorCourse"
          v-dompurify-html="item.majorCourse"
          class="majorCourse"
        ></p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IEDUBACKGROUND } from '@/interface/model';
  import { formatDate } from '@/utils/common';
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    modelData: IEDUBACKGROUND;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .edu-background-content {
    box-sizing: border-box;
    .edu-list {
      display: flex;
      width: 100%;
      flex-direction: column;

      .list-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        padding-top: 15px;
        padding-bottom: 5px;
        .date-school-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-size: v-bind('modelStyle.titleFontSize');
          color: v-bind('modelStyle.titleColor');
          font-weight: v-bind('modelStyle.titleFontWeight');
          letter-spacing: 2px;
          margin-bottom: 5px;
          & :first-child {
            min-width: 165px;
          }
          & :last-child {
            width: 100px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
        }
        .special,
        .majorCourse {
          width: 100%;
          // display: flex;
          font-size: v-bind('modelStyle.textFontSize');
          color: v-bind('modelStyle.textColor');
          font-weight: v-bind('modelStyle.textFontWeight');
          line-height: 18px;
          text-align: justify;
        }
        .special {
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
