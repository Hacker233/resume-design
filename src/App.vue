<template>
  <el-config-provider size="default" :locale="zhCn">
    <!-- 导航栏 -->
    <nav-bar
      v-if="route.meta.isShowComNav"
      :key="refreshUuid"
      bg-color="#fff"
      font-color="green"
      position="sticky"
      icon-color="green"
    ></nav-bar>
    <router-view v-show="!isLoading" v-slot="{}" :key="refreshUuid"></router-view>
    <loading-com-vue v-show="isLoading"></loading-com-vue>
  </el-config-provider>
</template>
<script lang="ts" setup>
  import LoadingComVue from '@/components/Loading/LoadingCom.vue'; // 全局等待层

  import appStore from './store';
  import { storeToRefs } from 'pinia';
  // import { openAndCloseLoadingByTime } from './utils/common';
  import zhCn from 'element-plus/es/locale/lang/zh-cn';
  import { addWebsiteViewsAsync } from './http/api/panel';
  import { createWebHashHistory } from 'vue-router';

  const { isLoading } = storeToRefs(appStore.useLoadingStore);
  // openAndCloseLoadingByTime(1500); // 等待动画层
  const { refreshUuid } = appStore.useRefreshStore;
  const route = useRoute();

  // 查询和更新用户信息
  const { getAndUpdateUserInfo } = appStore.useUserInfoStore;
  const { token } = appStore.useTokenStore;
  if (token) {
    getAndUpdateUserInfo();
  }

  // 查询用简币信息
  const { getUserIntegralTotal } = appStore.useUserInfoStore;
  if (token) {
    getUserIntegralTotal();
  }

  // 增加网站访问量
  const addWebsiteViews = () => {
    addWebsiteViewsAsync();
  };
  addWebsiteViews();

  // 查询网站配置
  const { getWebsiteConfig } = appStore.useWebsiteConfigStore;
  getWebsiteConfig();

  // 动态更新 canonical 和修复哈希路由
  const router = useRouter();
  const isFirstLoad = ref(true);

  watchEffect(() => {
    // 只在第一次加载时执行
    if (isFirstLoad.value) {
      // 更新 canonical 链接
      const canonical: any = document.querySelector('link[rel="canonical"]');
      const url = `https://maobucv.com${route.fullPath}`;

      if (canonical) {
        canonical.href = url;
      } else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = url;
        document.head.appendChild(link);
      }

      // 修复哈希路由问题（仅第一次加载时执行）
      if (router.options.history instanceof createWebHashHistory().constructor) {
        window.history.replaceState(null, '', route.fullPath);
      }

      isFirstLoad.value = false;
    }
  });
</script>
<style>
  /* 设置了打印会出现问题 */
  #app {
    /* min-width: 1300px; */
  }
</style>
