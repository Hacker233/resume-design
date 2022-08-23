<!-- 校园经历 -->
<template>
  <div class="campus-experience">
    <!-- 标题 -->
    <slot name="model-title"></slot>
    <!-- 校园经历 -->
    <div class="campue-experience-list">
      <div v-for="(item, index) in data.LIST" :key="index" class="list">
        <ul>
          <!-- 经历时间 -->
          <li v-if="data.isShow.date">{{ formatDate(item.date) }}</li>
          <!-- 项目名称 -->
          <li v-if="data.isShow.campusBriefly">{{ item.campusBriefly }}</li>
          <!-- 主要职责 -->
          <li v-if="data.isShow.campusDuty">{{ item.campusDuty }}</li>
        </ul>
        <!-- 简述 -->
        <p v-if="data.isShow.campusContent">{{ item.campusContent }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IMATERIALITEM } from '@/interface/material';
  import { ICAMPUSEXPERIENCE } from '@/interface/model';
  import { formatDate } from '@/utils/common';
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
