<!-- 荣誉奖项 -->
<template>
  <div class="edu-background">
    <!-- 标题 -->
    <model-title
      :title="modelData.title"
      :iconfont="modelData.iconfont"
      :model-style="modelStyle"
    ></model-title>
    <!-- 教育背景 -->
    <div class="edu-list">
      <div v-for="(item, index) in modelData.LIST" :key="index" class="list-item">
        <!-- 日期和学校 -->
        <div class="date-school-box">
          <span v-if="modelData.isShow.date">
            {{ formatDate(item.date) }}
          </span>
          <span v-if="modelData.isShow.awardsName">
            {{ item.awardsName }}
          </span>
        </div>
        <!-- 奖项等级 -->
        <p v-if="modelData.isShow.awardsGrade" class="majorCourse">{{ item.awardsGrade }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IAWARDS } from '@/interface/model';
  import ModelTitle from '@/material/ModelTitle/ModelTitle2/ModelTitle.vue';
  import { formatDate } from '@/utils/common';
  import IMODELSTYLE from '@/interface/modelStyle';

  defineProps<{
    modelData: IAWARDS;
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

      .list-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: 20px;
        .date-school-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-size: v-bind('modelStyle.titleFontSize');
          color: v-bind('modelStyle.titleColor');
          font-weight: v-bind('modelStyle.titleFontWeight');
          letter-spacing: 2px;
          margin-bottom: 5px;
        }
        .majorCourse {
          width: 100%;
          // display: flex;
          font-size: v-bind('modelStyle.textFontSize');
          color: v-bind('modelStyle.textColor');
          font-weight: v-bind('modelStyle.textFontWeight');
          line-height: 18px;
          text-align: justify;
        }
      }
    }
  }
</style>
