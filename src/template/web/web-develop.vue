<template>
  <template v-for="(item, index) in componentData.LIST" :key="item.id">
    <!-- 标题 -->
    <div class="title" v-if="item.model === 'RESUM_TITLE' && item.show">
      <div class="left"></div>
      <div class="editor-resume">{{ item.title }}</div>
    </div>
    <!-- 基础资料 -->
    <div class="base-info" v-if="item.model === 'BASE_INFO' && item.show">
      <base-info :baseInfo="item"></base-info>
    </div>
  </template>
</template>
<script setup lang="ts">
import BaseInfo from './components/BaseInfo.vue';
  const props = defineProps({
    componentData: {
      type: Object,
      default: (): object => {
        return {};
      }
    }
  });
</script>
<script lang="ts">

  export default {
    name: 'web-develop'
  };
</script>
<style lang="less" scoped>
  .title {
    width: 100%;
    min-height: 32px;
    background-color: v-bind('componentData.THEME_color');
    margin-top: 20px;
    display: flex;

    .left {
      min-height: 32px;
      width: 36px;
      background-color: #258bb1;
      margin-right: 18px;
    }

    .editor-resume {
      color: #fff;
      outline: none;
      font-weight: 600;
      letter-spacing: 2px;
      word-break: break-all;
      width: 0;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
  .base-info {
    height: 200px;
    width: 100%;
    padding: 40px 40px 0 40px;
    box-sizing: border-box;
  }
</style>
