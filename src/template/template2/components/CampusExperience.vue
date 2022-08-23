<!-- 校园经历 -->
<template>
  <div class="campus-experience">
    <!-- 标题 -->
    <model-title :title="data.title" :iconfont="data.iconfont"></model-title>
    <!-- 校园经历 -->
    <div v-for="(item, index) in data.LIST" :key="index" class="list">
      <ul>
        <!-- 经历时间和项目名称 -->
        <div class="date-name-box">
          <span v-if="data.isShow.date">{{ formatDate(item.date) }}</span>
          <!-- 项目名称 -->
          <span v-if="data.isShow.campusBriefly">{{ item.campusBriefly }}</span>
        </div>
        <!-- 主要职责 -->
        <p v-if="data.isShow.campusDuty" class="campusDuty">{{ item.campusDuty }}</p>
        <!-- 简述 -->
        <p v-if="data.isShow.campusContent" class="campusContent">{{ item.campusContent }}</p>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ICAMPUSEXPERIENCE } from '@/interface/model';
  import ModelTitle from './ModelTitle.vue';
  import { formatDate } from '@/utils/common';
  import { IMATERIALITEM } from '@/interface/material';

  defineProps<{
    modelData: IMATERIALITEM;
    data: ICAMPUSEXPERIENCE;
  }>();
</script>
<style lang="scss" scoped>
  .campus-experience {
    padding: v-bind('modelData.style.pTopBottom') v-bind('modelData.style.pLeftRight');
    margin-bottom: v-bind('modelData.style.mBottom');
    margin-top: v-bind('modelData.style.mTop');
    box-sizing: border-box;
    .list {
      display: flex;
      flex-direction: column;
      display: flex;
      width: 100%;
      flex-direction: column;
      margin-top: 20px;
      ul {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .date-name-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-size: v-bind('modelData.style.titleFontSize');
          color: v-bind('modelData.style.titleColor');
          font-weight: v-bind('modelData.style.titleFontWeight');
          letter-spacing: 2px;
          margin-bottom: 5px;
        }
        .campusDuty,
        .campusContent {
          width: 100%;
          display: flex;
          font-size: v-bind('modelData.style.textFontSize');
          color: v-bind('modelData.style.textColor');
          font-weight: v-bind('modelData.style.textFontWeight');
          line-height: 18px;
          text-align: justify;
          font-family: '微软雅黑';
        }
        .campusDuty {
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
