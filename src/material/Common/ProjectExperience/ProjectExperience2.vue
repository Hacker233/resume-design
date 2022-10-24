<!-- 项目经验 -->
<template>
  <div class="project-experience-content">
    <!-- 校园经历 -->
    <div class="project-experience-list">
      <div v-for="(item, index) in modelData.LIST" :key="index" class="list">
        <ul>
          <!-- 经历时间 -->
          <li v-if="modelData.isShow.date" class="list-title start-end-date">{{
            formatDate(item.date)
          }}</li>
          <!-- 公司名称 -->
          <li v-if="modelData.isShow.projectName" class="list-title">{{ item.projectName }}</li>
          <!-- 主要职责 -->
          <li v-if="modelData.isShow.posts" class="list-title">{{ item.posts }}</li>
        </ul>
        <!-- 简述 -->
        <div class="job-content">
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
  import { formatDate } from '@/utils/common';
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    modelData: IPROJECTEXPERIENCE;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .project-experience-content {
    box-sizing: border-box;
    .project-experience-list {
      padding-top: 15px;
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
          .content-list {
            flex: 1;
            ul {
              display: flex;
              flex-direction: column;
              padding-left: 18px;
              li {
                letter-spacing: 2px;
                font-size: v-bind('modelStyle.textFontSize');
                color: v-bind('modelStyle.textColor');
                font-weight: v-bind('modelStyle.textFontWeight');
                line-height: 1.5;
                text-align: justify;
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
