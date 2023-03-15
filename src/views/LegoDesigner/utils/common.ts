// import appStore from '@/store';
// import { storeToRefs } from 'pinia';

// 获取assets静态资源
export const getAssetsFile = (url: string) => {
  return new URL(`../screenShot/${url}`, import.meta.url).href;
};

// 重新计算每个组件的top值
export const computeWidgetTop = () => {
  // const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);
};
