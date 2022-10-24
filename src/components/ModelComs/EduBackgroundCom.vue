<!-- 教育背景 -->
<template>
  <div class="edu-background">
    <!-- 标题 -->
    <slot name="model-title"></slot>
    <!-- 教育背景 -->
    <div class="edu-list">
      <div v-for="(item, index) in modelData.LIST" :key="index" class="list-item">
        <!-- 日期和学校 -->
        <div class="date-school-box">
          <span v-if="modelData.isShow.date">
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
  import useGetLineLeft from '@/hooks/material/useTemplate3LeftLine';
  import { IEDUBACKGROUND } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import { formatDate } from '@/utils/common';
  const props = defineProps<{
    modelData: IEDUBACKGROUND;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
  // 模板3左侧竖线
  const { left } = useGetLineLeft(props.modelStyle);
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
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 100%;
      background-color: v-bind('modelStyle.themeColor');
      left: v-bind('left');
      top: 5px;
    }
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
          & :first-child {
            min-width: 165px;
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
