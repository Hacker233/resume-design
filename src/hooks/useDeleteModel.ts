/**
 * @description 删除或关闭当前模块
 */

import appStore from "@/store";

// 删除当前模块
export const useDeleteModel = (modelItem: any) => {
  const { resumeJsonStore } = appStore.useResumeJsonStore;
  let index = resumeJsonStore.LIST.findIndex((item) => item.id === modelItem.id); // 需要复制的模块的索引
  let sum: number = 0; // 是否有相同的模块
  resumeJsonStore.LIST.forEach((item) => {
    if (item.model === modelItem.model) {
      sum++;
    }
  });
  if (sum > 1) {
    resumeJsonStore.LIST.splice(index, 1);
  } else {
    resumeJsonStore.LIST[index].show = false;
  }
};
