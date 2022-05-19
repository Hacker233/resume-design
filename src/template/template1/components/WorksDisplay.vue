<!-- 作品展示 -->
<template>
  <div class="works-display">
    <!-- 标题 -->
    <model-title :title="modelData.title"></model-title>
    <!-- 作品展示 -->
    <ul class="works-display-list">
      <li v-for="(item, index) in modelData.LIST" :key="index">
        <h1>{{ item.worksName }}</h1>
        <a :href="item.worksLink">{{ item.worksLink }}</a>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { IWORKSDISPLAY } from '@/types/model';
  import ModelTitle from './ModelTitle.vue';
  defineProps<{
    modelData: IWORKSDISPLAY;
  }>();
</script>
<style lang="less" scoped>
  .works-display {
    padding: 0 40px;
    margin-bottom: v-bind('modelData.style.mBottom');
    margin-top: v-bind('modelData.style.mTop');
    .works-display-list {
      margin-top: 25px;
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        flex-direction: column;
        list-style: none;
        h1 {
          font-size: v-bind('modelData.style.textFontSize');
          color: v-bind('modelData.style.textColor');
          font-weight: v-bind('modelData.style.textFontWeight');
          letter-spacing: 2px;
        }
        a {
          font-size: @primary-text-font-size;
        }
        &:not(:last-child) {
          margin-bottom: 15px;
        }
      }
    }
  }
</style>
