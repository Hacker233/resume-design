<template>
  <div class="base-info-common-1-box">
    <!-- 基本信息 -->
    <div class="user-info">
      <div class="top">
        <!-- 头像 -->
        <avatar1 :model-data="modelData" :model-style="modelStyle"></avatar1>
        <!-- 个人信息 -->
        <user-info1-vue :model-data="modelData" :model-style="modelStyle"></user-info1-vue>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import UserInfo1Vue from './components/userInfo/UserInfo1.vue';
  import avatar1 from './components/avatar/avatar1.vue';
  defineProps<{
    modelData: IBASEINFO; // 模块数据
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .base-info-common-1-box {
    width: 100%;
    cursor: pointer;
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    .user-info {
      display: flex;
      flex-direction: column;
      .top {
        display: flex;
        align-items: flex-end;
        // 头像
        :deep(.avatar-shape-box) {
          margin-right: 50px;
        }
      }
    }
  }
</style>
