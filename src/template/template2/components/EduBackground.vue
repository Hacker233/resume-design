<!-- 教育背景 -->
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
          <span v-if="modelData.isShow.schoolName">
            {{ item.schoolName }}
          </span>
          <span v-if="modelData.isShow.degree">
            {{ item.degree }}
          </span>
        </div>
        <!-- 专业 -->
        <p class="special" v-if="modelData.isShow.specialized">{{ item.specialized }}</p>
        <!-- 教学经历 -->
        <p class="majorCourse" v-if="modelData.isShow.majorCourse">{{ item.majorCourse }}</p>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IEDUBACKGROUND } from '@/interface/model';
  import { ComponentInternalInstance, getCurrentInstance } from 'vue';
  import ModelTitle from './ModelTitle.vue';
  // 获取全局挂载的moment对象
  const instance = getCurrentInstance() as ComponentInternalInstance;
  const moment = instance.appContext.config.globalProperties.$moment;
  defineProps<{
    modelData: IEDUBACKGROUND;
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
        .special,
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
        .special {
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
