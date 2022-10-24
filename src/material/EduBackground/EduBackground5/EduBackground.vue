<!-- 教育背景 -->
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
  import ModelTitle from '@/material/ModelTitle/ModelTitle5/ModelTitle.vue';
  import { formatDate } from '@/utils/common';
  import IMODELSTYLE from '@/interface/modelStyle';
  import useGetLineLeft from '@/hooks/material/useTemplate3LeftLine';
  const props = defineProps<{
    modelData: IEDUBACKGROUND;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
  const { left } = useGetLineLeft(props.modelStyle, -23);
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
        padding: 30px 30px 10px 50px;
        box-sizing: border-box;
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
