<!-- 荣誉奖项 -->
<template>
  <div class="edu-background">
    <!-- 标题 -->
    <model-title :title="modelData.title"></model-title>
    <!-- 教育背景 -->
    <div class="edu-list">
      <ul v-for="(item, index) in modelData.LIST" :key="index">
        <!-- 日期和学校 -->
        <div class="date-school-box">
          <span v-if="modelData.isShow.date">
            {{ moment(new Date(item.date[0])).format('YYYY.MM').split('-').join('.') }}
            -
            {{ moment(new Date(item.date[1])).format('YYYY.MM').split('-').join('.') }}
          </span>
          <span v-if="modelData.isShow.awardsName">
            {{ item.awardsName }}
          </span>
        </div>
        <!-- 奖项等级 -->
        <p class="majorCourse" v-if="modelData.isShow.awardsGrade">{{ item.awardsGrade }}</p>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IAWARDS } from '@/types/model';
  import { ComponentInternalInstance, getCurrentInstance } from 'vue';
  import ModelTitle from './ModelTitle.vue';
  // 获取全局挂载的moment对象
  const instance = getCurrentInstance() as ComponentInternalInstance;
  const moment = instance.appContext.config.globalProperties.$moment;
  defineProps<{
    modelData: IAWARDS;
  }>();
</script>
<style lang="less" scoped>
  .edu-background {
    // padding: 0 40px;
    margin-bottom: v-bind('modelData.style.mBottom');
    margin-top: v-bind('modelData.style.mTop');
    .edu-list {
      display: flex;
      width: 100%;
      flex-direction: column;

      ul {
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
          font-size: v-bind('modelData.style.titleFontSize');
          color: v-bind('modelData.style.titleColor');
          font-weight: v-bind('modelData.style.titleFontWeight');
          letter-spacing: 2px;
          margin-bottom: 5px;
        }
        .majorCourse {
          width: 100%;
          display: flex;
          font-size: v-bind('modelData.style.textFontSize');
          color: v-bind('modelData.style.textColor');
          font-weight: v-bind('modelData.style.textFontWeight');
          line-height: 18px;
          text-align: justify;
        font-family: '微软雅黑';
        }
      }
    }
  }
</style>
