<!-- 项目经验 -->
<template>
  <div class="project-experience">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 校园经历 -->
    <div class="project-experience-list">
      <div v-for="(item, index) in modelData.LIST" :key="index" class="list">
        <ul>
          <!-- 经历时间 -->
          <li v-if="modelData.isShow.date" class="list-title">{{ formatDate(item.date) }}</li>
          <!-- 公司名称 -->
          <li v-if="modelData.isShow.projectName" class="list-title">{{ item.projectName }}</li>
          <!-- 主要职责 -->
          <li v-if="modelData.isShow.posts" class="list-title">{{ item.posts }}</li>
        </ul>
        <!-- 简述 -->
        <div class="job-content">
          <p class="left">项目内容</p>
          <div class="content-list">
            <ul>
              <li
                v-for="(list, j) in item.projectContent"
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
  import { IPROJECTEXPERIENCE } from '@/interface/model';
  import ModelTitle from '@/material/ModelTitle/ModelTitle5/ModelTitle.vue';
  import { formatDate } from '@/utils/common';
  import IMODELSTYLE from '@/interface/modelStyle';
  import useGetLineLeft from '@/hooks/material/useTemplate3LeftLine';
  const props = defineProps<{
    modelData: IPROJECTEXPERIENCE;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
  const { left } = useGetLineLeft(props.modelStyle, -23);
</script>
<style lang="scss" scoped>
  .project-experience {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 100%;
      background-color: v-bind('modelStyle.themeColor');
      left: v-bind('left');
      top: 5px;
    }
    .project-experience-list {
      padding: 30px 30px 10px 50px;
      box-sizing: border-box;
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
            font-weight: bold;
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
