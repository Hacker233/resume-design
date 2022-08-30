/**
 * @description 删除或关闭当前模块
 */

import appStore from "@/store";

// 删除当前模块
export const useDeleteModel = (modelItem: any) => {
  const { resumeJsonNewStore } = appStore.useResumeJsonNewStore;
  let index = resumeJsonNewStore.COMPONENTS.findIndex((item) => item.keyId === modelItem.keyId); // 需要复制的模块的索引
  let sum: number = 0; // 是否有相同的模块
  resumeJsonNewStore.COMPONENTS.forEach((item) => {
    if (item.model === modelItem.model) {
      sum++;
    }
  });
  if (sum > 1) {
    resumeJsonNewStore.COMPONENTS.splice(index, 1);
  } else {
    resumeJsonNewStore.COMPONENTS[index].show = false;
  }
};
