<template>
  <div class="base-info-common-2-box">
    <!-- 个人信息 -->
    <user-info3-vue :model-data="modelData" :model-style="modelStyle"></user-info3-vue>
    <!-- 头像 -->
    <avatar1 :model-data="modelData" :model-style="modelStyle"></avatar1>
  </div>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import UserInfo3Vue from './components/userInfo/UserInfo3.vue';
  import avatar1 from './components/avatar/avatar1.vue';
  defineProps<{
    modelData: IBASEINFO; // 模块数据
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .base-info-common-2-box {
    background: url(../../../assets/images/template3_bg_2.png);
    background-repeat: no-repeat;
    width: 100%;
    height: 250px;
    border-bottom: 1px dashed #cfcfcf;
    box-sizing: border-box;
    padding: 40px 50px;
    padding-left: 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    // 头像
    :deep(.avatar-box) {
      margin-right: 0;
    }
  }
</style>
