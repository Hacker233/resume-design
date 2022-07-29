<!-- 校园经历 -->
<template>
  <div class="campus-experience">
    <!-- 标题 -->
    <slot name="model-title"></slot>
    <!-- 校园经历 -->
    <div class="campue-experience-list">
      <div class="list" v-for="(item, index) in modelData.LIST" :key="index">
        <ul>
          <!-- 经历时间 -->
          <li v-if="modelData.isShow.date">{{ formatDate(item.date) }}</li>
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
  import { ICAMPUSEXPERIENCE } from '@/interface/model';
  import { formatDate } from '@/utils/common';
  defineProps<{
    modelData: ICAMPUSEXPERIENCE;
  }>();
</script>
<style lang="scss" scoped>
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
