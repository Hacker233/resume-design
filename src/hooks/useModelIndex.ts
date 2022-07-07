import { useResumeJsonStore, useResumeModelStore } from '@/store/resume';

/**
 * @description 返回选中模块的索引
 */
export const useModelIndex = () => {
  const { resumeJsonStore } = useResumeJsonStore();
  const useModel = useResumeModelStore();
  return resumeJsonStore.LIST.findIndex((item) => item.id === useModel.id); // 选中的索引
};


