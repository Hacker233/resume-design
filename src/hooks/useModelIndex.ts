import appStore from '@/store';
/**
 * @description 返回选中模块的索引
 */
export const useModelIndex = () => {
  const { resumeJsonStore } = appStore.useResumeJsonStore;
  const { id } = appStore.useResumeModelStore;
  return resumeJsonStore.LIST.findIndex((item) => item.id === id); // 选中的索引
};
