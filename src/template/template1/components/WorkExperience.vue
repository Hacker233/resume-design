<!-- 工作经验 -->
<template>
  <div class="work-experience">
    <!-- 标题 -->
    <model-title :title="data.title"></model-title>
    <!-- 校园经历 -->
    <div class="work-experience-list">
      <div v-for="(item, index) in data.LIST" :key="index" class="list">
        <ul>
          <!-- 经历时间 -->
          <li v-if="data.isShow.date" class="list-title">{{ formatDate(item.date) }}</li>
          <!-- 公司名称 -->
          <li v-if="data.isShow.companyName" class="list-title">{{ item.companyName }}</li>
          <!-- 主要职责 -->
          <li v-if="data.isShow.posts" class="list-title">{{ item.posts }}</li>
        </ul>
        <!-- 简述 -->
        <div class="job-content">
          <p class="left">工作内容</p>
          <div class="content-list">
            <ul>
              <li v-for="(list, index) in item.jobContent" :key="index">{{ list.content }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IWORKEXPERIENCE } from '@/interface/model';
  import ModelTitle from './ModelTitle.vue';
  import { formatDate } from '@/utils/common';
  import { IMATERIALITEM } from '@/interface/material';
  defineProps<{
    modelData: IMATERIALITEM;
    data: IWORKEXPERIENCE;
  }>();
</script>
<style lang="scss" scoped>
  .work-experience {
    padding: 0 40px;
    margin-bottom: v-bind('modelData.style.mBottom');
    margin-top: v-bind('modelData.style.mTop');
    .work-experience-list {
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
          .list-title {
            list-style: none;
            font-size: v-bind('modelData.style.titleFontSize');
            color: v-bind('modelData.style.titleColor');
            font-weight: v-bind('modelData.style.titleFontWeight');
            letter-spacing: 2px;
          }
        }
        .job-content {
          display: flex;
          .left {
            width: 20%;
            letter-spacing: 2px;
            font-size: v-bind('modelData.style.titleFontSize');
            color: v-bind('modelData.style.titleColor');
            font-weight: v-bind('modelData.style.titleFontWeight');
          }
          .content-list {
            flex: 1;
            ul {
              display: flex;
              flex-direction: column;
              li {
                letter-spacing: 2px;
                font-size: v-bind('modelData.style.textFontSize');
                color: v-bind('modelData.style.textColor');
                font-weight: v-bind('modelData.style.textFontWeight');
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
