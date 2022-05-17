<!-- 校园经历 -->
<template>
  <div class="campus-experience">
    <!-- 标题 -->
    <model-title :title="modelData.title"></model-title>
    <!-- 校园经历 -->
    <div class="campue-experience-list">
      <div class="list" v-for="(item, index) in modelData.LIST" :key="index">
        <ul>
          <!-- 经历时间 -->
          <li v-if="modelData.isShow.date"
            >{{ moment(new Date(item.date[0])).format('YYYY.MM').split('-').join('.') }}
            -
            {{ moment(new Date(item.date[1])).format('YYYY.MM').split('-').join('.') }}</li
          >
          <!-- 项目名称 -->
          <li v-if="modelData.isShow.campusBriefly">{{ item.campusBriefly }}</li>
          <!-- 主要职责 -->
          <li v-if="modelData.isShow.campusDuty">{{ item.campusDuty }}</li>
        </ul>
        <!-- 简述 -->
        <p v-if="modelData.isShow.campusContent">{{ item.campusContent }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ICAMPUSEXPERIENCE } from '@/types/model';
  import { ComponentInternalInstance, getCurrentInstance } from 'vue';
  import ModelTitle from './ModelTitle.vue';
  // 获取全局挂载的moment对象
  const instance = getCurrentInstance() as ComponentInternalInstance;
  const moment = instance.appContext.config.globalProperties.$moment;
  defineProps<{
    modelData: ICAMPUSEXPERIENCE;
  }>();
</script>
<style lang="less" scoped>
  .campus-experience {
    padding: 0 40px;
    margin-bottom: v-bind('modelData.style.mBottom');
    margin-top: v-bind('modelData.style.mTop');
    .campue-experience-list {
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
          li {
            list-style: none;
            font-size: v-bind('modelData.style.titleFontSize');
            color: v-bind('modelData.style.titleColor');
            font-weight: v-bind('modelData.style.titleFontWeight');
            letter-spacing: 2px;
          }
        }
        p {
          letter-spacing: 2px;
          font-size: v-bind('modelData.style.textFontSize');
          color: v-bind('modelData.style.textColor');
          font-weight: v-bind('modelData.style.textFontWeight');
          line-height: 1.5;
        }
      }
    }
  }
</style>
