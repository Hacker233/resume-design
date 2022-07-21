<template>
  <router-view v-slot="{}"></router-view>
  <loading-com-vue v-show="isLoading"></loading-com-vue>
</template>
<script lang="ts" setup>
  import LoadingComVue from '@/components/Loading/LoadingCom.vue'; // 全局等待层
  import { useLoadingStore } from '@/store/loading';
  import { storeToRefs } from 'pinia';
  import { openAndCloseLoadingByTime } from './utils/common';
  const { isLoading } = storeToRefs(useLoadingStore());
  openAndCloseLoadingByTime(1500); // 等待动画层
</script>
<style></style>
