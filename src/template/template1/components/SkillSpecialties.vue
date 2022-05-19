<!-- 技能特长 -->
<template>
  <div class="skill-specialties">
    <!-- 标题 -->
    <model-title :title="modelData.title"></model-title>
    <!-- 技能特长 -->
    <ul>
      <!-- 左边部分 -->
      <div class="left">
        <template v-for="(item, index) in modelData.LIST" :key="index">
          <li v-if="index % 2 === 0">{{ item.introduce }}</li>
        </template>
      </div>
      <!-- 右边部分 -->
      <div class="right">
        <template v-for="(item, index) in modelData.LIST" :key="index">
          <li v-if="index % 2 != 0">{{ item.introduce }}</li>
        </template>
      </div>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { ISKILLSPECIALTIES } from '@/types/model';
  import ModelTitle from './ModelTitle.vue';
  defineProps<{
    modelData: ISKILLSPECIALTIES;
  }>();
</script>
<style lang="less" scoped>
  .skill-specialties {
    padding: 0 40px;
    margin-top: v-bind('modelData.style.mTop');
    margin-bottom: v-bind('modelData.style.mBottom');
    ul {
      display: flex;
      flex-wrap: wrap;
      .left,
      .right {
        flex: 40%;
        margin-top: 25px;
        li {
          letter-spacing: 2px;
          font-size: v-bind('modelData.style.textFontSize');
          color: v-bind('modelData.style.textColor');
          font-weight: v-bind('modelData.style.textFontWeight');
          line-height: 1.5;
          &:not(:last-child) {
            margin-bottom: 10px;
          }
        }
      }
      .left {
        padding: 0 20px;
      }
      .right {
        padding: 0 0 0 10px;
      }
    }
  }
</style>
