<template>
  <el-config-provider size="small" :locale="zhCn">
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
  import { useHead } from '@vueuse/head';
  useHead({
    meta: [
      {
        name: 'description',
        content:
          '猫步简历-开源简历制作神器！免费制作一份精美的简历！内置两款设计器、快速设计、简历、封面、海报均可免费制作，支持一键导出高清PDF、JSON数据等。'
      },
      {
        name: 'keywords',
        content: '简历 开源 设计器 制作 PDF 高清简历 免费开源'
      }
    ]
  });

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
</script>
<style>
  /* 设置了打印会出现问题 */
  #app {
    /* min-width: 1300px; */
  }
</style>
