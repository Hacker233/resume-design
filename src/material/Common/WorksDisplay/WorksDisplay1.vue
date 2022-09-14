<!-- 作品展示 -->
<template>
  <div class="works-display-content">
    <!-- 作品展示 -->
    <ul class="works-display-list">
      <li v-for="(item, index) in modelData.LIST" :key="index">
        <h1>{{ item.worksName }}</h1>
        <a :href="item.worksLink" target="_blank">{{ item.worksLink }}</a>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { IWORKSDISPLAY } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    modelData: IWORKSDISPLAY;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .works-display-content {
    box-sizing: border-box;
    .works-display-list {
      padding-top: 15px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      li {
        display: flex;
        flex-direction: column;
        list-style: none;
        h1 {
          font-size: v-bind('modelStyle.textFontSize');
          color: v-bind('modelStyle.textColor');
          font-weight: v-bind('modelStyle.textFontWeight');
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
