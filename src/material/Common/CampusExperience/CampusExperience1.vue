<!-- 校园经历 -->
<template>
  <div class="campus-experience-content">
    <!-- 校园经历 -->
    <div class="campue-experience-list">
      <div v-for="(item, index) in modelData.LIST" :key="index" class="list">
        <ul>
          <!-- 经历时间 -->
          <li v-if="modelData.isShow.date" class="start-end-date">{{ formatDate(item.date) }}</li>
          <!-- 项目名称 -->
          <li v-if="modelData.isShow.campusBriefly">{{ item.campusBriefly }}</li>
          <!-- 主要职责 -->
          <li v-if="modelData.isShow.campusDuty">{{ item.campusDuty }}</li>
        </ul>
        <!-- 简述 -->
        <p v-if="modelData.isShow.campusContent" v-dompurify-html="item.campusContent"></p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ICAMPUSEXPERIENCE } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import { formatDate } from '@/utils/common';
  defineProps<{
    modelData: ICAMPUSEXPERIENCE;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .campus-experience-content {
    box-sizing: border-box;
    .campue-experience-list {
      padding-top: 15px;
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
          & :first-child {
            min-width: 165px;
          }
          li {
            list-style: none;
            font-size: v-bind('modelStyle.titleFontSize');
            color: v-bind('modelStyle.titleColor');
            font-weight: v-bind('modelStyle.titleFontWeight');
            letter-spacing: 2px;
          }
        }
        p {
          letter-spacing: 2px;
          font-size: v-bind('modelStyle.textFontSize');
          color: v-bind('modelStyle.textColor');
          font-weight: v-bind('modelStyle.textFontWeight');
          line-height: 1.5;
          text-align: justify;
        }
      }
    }
  }
</style>
