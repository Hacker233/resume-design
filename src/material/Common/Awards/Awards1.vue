<!-- 荣誉奖项 -->
<template>
  <div class="awards-content">
    <!-- 荣誉奖项 -->
    <div class="awards-list">
      <ul v-for="(item, index) in modelData.LIST" :key="index">
        <!-- 获奖日期 -->
        <li v-show="modelData.isShow.date" class="start-end-date">{{ formatDate(item.date) }}</li>
        <!-- 奖项名称 -->
        <li v-show="modelData.isShow.awardsName">{{ item.awardsName }}</li>
        <!-- 奖项等级 -->
        <li v-show="modelData.isShow.awardsGrade">{{ item.awardsGrade }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IAWARDS } from '@/interface/model';
  import { formatDate } from '@/utils/common';
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    modelData: IAWARDS;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .awards-content {
    box-sizing: border-box;
    .awards-list {
      display: flex;
      width: 100%;
      flex-direction: column;
      padding-top: 15px;
      box-sizing: border-box;

      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          list-style: none;
          font-size: v-bind('modelStyle.textFontSize');
          color: v-bind('modelStyle.textColor');
          font-weight: v-bind('modelStyle.textFontWeight');
          letter-spacing: 2px;
        }
        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
