<template>
  <el-config-provider size="small">
    <router-view v-show="!isLoading" v-slot="{}"></router-view>
    <loading-com-vue v-show="isLoading"></loading-com-vue>
    <auth-dialog />
  </el-config-provider>
</template>
<script lang="ts" setup>
  import LoadingComVue from '@/components/Loading/LoadingCom.vue'; // 全局等待层
  import AuthDialog from '@/components/AuthDialog/AuthDialog.vue';
  import { storeToRefs } from 'pinia';
  import { openAndCloseLoadingByTime } from './utils/common';
  import appStore from './store';
  const { isLoading } = storeToRefs(appStore.useLoadingStore);
  openAndCloseLoadingByTime(1500); // 等待动画层
</script>
<style>
  #app {
    min-width: 1500px;
  }
</style>
