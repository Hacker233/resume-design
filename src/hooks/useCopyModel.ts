/**
 * @description 复制当前模块
 */

import appStore from "@/store";
import { getUuid } from "@/utils/common";
import { cloneDeep } from 'lodash'; // 深拷贝

// 复制当前模块
export const useCopyModel = (modelItem: any) => {
  const { resumeJsonStore } = appStore.useResumeJsonStore;
  let index = resumeJsonStore.LIST.findIndex((item) => item.id === modelItem.id); // 需要复制的模块的索引
  const deepItem = cloneDeep(modelItem);
  deepItem.id = getUuid();
  resumeJsonStore.LIST.splice(index, 0, deepItem);
};