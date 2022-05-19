<!-- 项目经验 -->
<template>
  <div class="project-experience">
    <!-- 标题 -->
    <model-title :title="modelData.title"></model-title>
    <!-- 校园经历 -->
    <div class="project-experience-list">
      <div class="list" v-for="(item, index) in modelData.LIST" :key="index">
        <ul>
          <!-- 经历时间 -->
          <li class="list-title"
            >{{ moment(new Date(item.date[0])).format('YYYY.MM').split('-').join('.') }}
            -
            {{ moment(new Date(item.date[1])).format('YYYY.MM').split('-').join('.') }}</li
          >
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
  import { ComponentInternalInstance, getCurrentInstance } from 'vue';
  import ModelTitle from './ModelTitle.vue';
  // 获取全局挂载的moment对象
  const instance = getCurrentInstance() as ComponentInternalInstance;
  const moment = instance.appContext.config.globalProperties.$moment;
  defineProps<{
    modelData: IPROJECTEXPERIENCE;
  }>();
</script>
<style lang="less" scoped>
  .project-experience {
    padding: 0 40px;
    margin-bottom: v-bind('modelData.style.mBottom');
    margin-top: v-bind('modelData.style.mTop');
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
            font-weight: bold;
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
