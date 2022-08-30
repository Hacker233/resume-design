<template>
  <el-config-provider size="small" :locale="zhCn">
    <router-view v-show="!isLoading" v-slot="{}"></router-view>
    <loading-com-vue v-show="isLoading"></loading-com-vue>
  </el-config-provider>
</template>
<script lang="ts" setup>
  import LoadingComVue from '@/components/Loading/LoadingCom.vue'; // 全局等待层
  import appStore from './store';
  import { storeToRefs } from 'pinia';
  import { openAndCloseLoadingByTime } from './utils/common';
  import zhCn from 'element-plus/lib/locale/lang/zh-cn';
  import { test } from '@/http/api/test';
  const { isLoading } = storeToRefs(appStore.useLoadingStore);
  openAndCloseLoadingByTime(1500); // 等待动画层

  // 测试发送请求
  const testHttp = async () => {
    let params = {
      menuId: 12
    };
    // const data = await test(params);
    // console.log("请求返回结果", data)
  };
  testHttp();
</script>
<style>
  #app {
    min-width: 1500px;
  }
</style>
