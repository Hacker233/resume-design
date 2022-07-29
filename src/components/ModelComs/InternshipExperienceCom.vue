<!-- 实习经验 -->
<template>
  <div class="internship-experience">
    <!-- 标题 -->
    <slot name="model-title"></slot>
    <!-- 校园经历 -->
    <div class="internship-experience-list">
      <div class="list" v-for="(item, index) in modelData.LIST" :key="index">
        <ul>
          <!-- 经历时间 -->
          <li class="list-title" v-if="modelData.isShow.date">{{ formatDate(item.date) }}</li>
          <!-- 公司名称 -->
          <li class="list-title">{{ item.companyName }}</li>
          <!-- 主要职责 -->
          <li class="list-title">{{ item.posts }}</li>
        </ul>
        <!-- 简述 -->
        <div class="job-content">
          <p class="left">实习内容</p>
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
  import { IINTERNSHIPEXPERIENCE } from '@/interface/model';
  import { formatDate } from '@/utils/common';
  defineProps<{
    modelData: IINTERNSHIPEXPERIENCE;
  }>();
</script>
<style lang="scss" scoped>
  .internship-experience {
    padding: 0 40px;
    margin-bottom: v-bind('modelData.style.mBottom');
    margin-top: v-bind('modelData.style.mTop');
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
