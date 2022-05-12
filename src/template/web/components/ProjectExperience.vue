<!-- 项目经验 -->
<template>
  <div class="project-experience">
    <!-- 标题 -->
    <model-title :title="projectExperience.title"></model-title>
    <!-- 校园经历 -->
    <div class="project-experience-list">
      <div class="list" v-for="(item, index) in projectExperience.LIST" :key="index">
        <ul>
          <!-- 经历时间 -->
          <li class="list-title">{{ item.date }}</li>
          <!-- 公司名称 -->
          <li class="list-title">{{ item.projectName }}</li>
          <!-- 主要职责 -->
          <li class="list-title">{{ item.posts }}</li>
        </ul>
        <!-- 简述 -->
        <div class="job-content">
          <p class="left">项目内容</p>
          <div class="content-list">
            <ul>
              <li v-for="(list, index) in item.projectContent" :key="index">{{ list.content }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IPROJECTEXPERIENCE } from '@/types/model';
  import ModelTitle from './ModelTitle.vue';
  defineProps<{
    projectExperience: IPROJECTEXPERIENCE;
  }>();
</script>
<style lang="less" scoped>
  .project-experience {
    padding: 0 40px;
    margin-bottom: 45px;
    .project-experience-list {
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
            font-size: @primary-text-font-size;
            color: @primary-sub-title-color;
            font-weight: bold;
            letter-spacing: 2px;
          }
        }
        .job-content {
          display: flex;
          .left {
            width: 20%;
            letter-spacing: 2px;
            font-size: @primary-text-font-size;
            color: @primary-sub-title-color;
            font-weight: bold;
          }
          .content-list {
            flex: 1;
            ul {
              display: flex;
              flex-direction: column;
              li {
                letter-spacing: 2px;
                font-size: @primary-text-font-size;
                color: @primary-text-color;
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
