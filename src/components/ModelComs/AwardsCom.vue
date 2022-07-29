<!-- 荣誉奖项 -->
<template>
  <div class="awards">
    <!-- 标题 -->
    <slot name="model-title"></slot>
    <!-- 荣誉奖项 -->
    <div class="awards-list">
      <ul v-for="(item, index) in modelData.LIST" :key="index">
        <!-- 获奖日期 -->
        <li v-show="modelData.isShow.date">{{ formatDate(item.date) }}</li>
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
  defineProps<{
    modelData: IAWARDS;
  }>();
</script>
<style lang="scss" scoped>
  .awards {
    padding: 0 40px;
    margin-bottom: v-bind('modelData.style.mBottom');
    margin-top: v-bind('modelData.style.mTop');
    .awards-list {
      display: flex;
      width: 100%;
      flex-direction: column;
      margin-top: 25px;

      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          list-style: none;
          font-size: v-bind('modelData.style.textFontSize');
          color: v-bind('modelData.style.textColor');
          font-weight: v-bind('modelData.style.textFontWeight');
          letter-spacing: 2px;
        }
        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
