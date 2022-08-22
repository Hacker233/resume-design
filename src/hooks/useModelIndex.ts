import appStore from '@/store';
/**
 * @description 返回选中模块的索引
 */
export const useModelIndex = () => {
  const { resumeJsonNewStore } = appStore.useResumeJsonNewStore;
  const { cptKeyId } = appStore.useSelectMaterialStore;
  return resumeJsonNewStore.COMPONENTS.findIndex((item) => item.keyId === cptKeyId); // 选中的索引
};
