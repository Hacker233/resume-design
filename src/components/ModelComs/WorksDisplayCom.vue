<!-- 作品展示 -->
<template>
  <div class="works-display">
    <!-- 标题 -->
    <slot name="model-title"></slot>
    <!-- 作品展示 -->
    <ul class="works-display-list">
      <li v-for="(item, index) in data.LIST" :key="index">
        <h1>{{ item.worksName }}</h1>
        <a :href="item.worksLink" target="_blank">{{ item.worksLink }}</a>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { IMATERIALITEM } from '@/interface/material';
  import { IWORKSDISPLAY } from '@/interface/model';
  defineProps<{
    modelData: IMATERIALITEM;
    data: IWORKSDISPLAY;
  }>();
</script>
<style lang="scss" scoped>
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
        align-items: flex-start;
        h1 {
          font-size: v-bind('modelData.style.textFontSize');
          color: v-bind('modelData.style.textColor');
          font-weight: v-bind('modelData.style.textFontWeight');
          letter-spacing: 2px;
          margin: 0;
        }
        a {
          font-size: $primary-text-font-size;
          margin-top: 5px;
          &:hover {
            color: #00c091;
          }
        }
        &:not(:last-child) {
          margin-bottom: 15px;
        }
      }
    }
  }
</style>
