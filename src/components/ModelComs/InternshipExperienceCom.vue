<!-- 实习经验 -->
<template>
  <div class="internship-experience">
    <!-- 标题 -->
    <slot name="model-title"></slot>
    <!-- 校园经历 -->
    <div class="internship-experience-list">
      <div v-for="(item, index) in modelData.LIST" :key="index" class="list">
        <ul>
          <!-- 经历时间 -->
          <li v-if="modelData.isShow.date" class="list-title">{{ formatDate(item.date) }}</li>
          <!-- 公司名称 -->
          <li v-if="modelData.isShow.companyName" class="list-title">{{ item.companyName }}</li>
          <!-- 主要职责 -->
          <li v-if="modelData.isShow.posts" class="list-title">{{ item.posts }}</li>
        </ul>
        <!-- 简述 -->
        <div class="job-content">
          <p class="left">实习内容</p>
          <div class="content-list">
            <ul>
              <li
                v-for="(list, j) in item.jobContent"
                :key="j"
                v-dompurify-html="list.content"
              ></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import useGetLineLeft from '@/hooks/material/useTemplate3LeftLine';
  import { IINTERNSHIPEXPERIENCE } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import { formatDate } from '@/utils/common';
  const props = defineProps<{
    modelData: IINTERNSHIPEXPERIENCE;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
  // 模板3左侧竖线
  const { left } = useGetLineLeft(props.modelStyle);
</script>
<style lang="scss" scoped>
  .internship-experience {
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
    .internship-experience-list {
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
          & :first-child {
            min-width: 165px;
          }
          .list-title {
            list-style: none;
            font-size: v-bind('modelStyle.titleFontSize');
            color: v-bind('modelStyle.titleColor');
            font-weight: v-bind('modelStyle.titleFontWeight');
            letter-spacing: 2px;
          }
        }
        .job-content {
          display: flex;
          .left {
            width: 20%;
            letter-spacing: 2px;
            font-size: v-bind('modelStyle.titleFontSize');
            color: v-bind('modelStyle.titleColor');
            font-weight: v-bind('modelStyle.titleFontWeight');
          }
          .content-list {
            flex: 1;
            ul {
              display: flex;
              flex-direction: column;
              li {
                letter-spacing: 2px;
                font-size: v-bind('modelStyle.textFontSize');
                color: v-bind('modelStyle.textColor');
                font-weight: v-bind('modelStyle.textFontWeight');
                line-height: 1.5;
                &:not(:last-child) {
                  margin-bottom: 6px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
