<template>
  <div class="base-info-common-2-box">
    <!-- 个人头像 -->
    <div class="avatar-wrapper">
      <avatar1 :model-data="modelData" :model-style="modelStyle"></avatar1>
    </div>
    <!-- 个人信息 -->
    <user-info2-vue :model-data="modelData" :model-style="modelStyle"></user-info2-vue>
  </div>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import avatar1 from './components/avatar/avatar1.vue';
  import UserInfo2Vue from './components/userInfo/UserInfo2.vue';
  defineProps<{
    modelData: IBASEINFO; // 模块数据
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .base-info-common-2-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');

    .avatar-wrapper {
      margin-bottom: 30px;
      :deep(.avatar-box) {
        margin-right: 0;
      }
    }
  }
</style>
