<!-- 校园经历 -->
<template>
  <div class="campus-experience">
    <!-- 标题 -->
    <model-title :title="modelData.title" :modelStyle="modelStyle"></model-title>
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
  import IMODELSTYLE from '@/interface/modelStyle';
  import { formatDate } from '@/utils/common';
  import ModelTitle from '../../ModelTitle/ModelTitle1/ModelTitle1.vue';
  defineProps<{
    modelData: ICAMPUSEXPERIENCE;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .campus-experience {
    padding: 0 40px;
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
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
        }
      }
    }
  }
</style>
