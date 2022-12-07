/**
 * @description 复制当前模块
 */

import appStore from '@/store';
import { getUuid } from '@/utils/common';
import { cloneDeep } from 'lodash'; // 深拷贝

// 复制当前模块
export const useCopyModel = (modelItem: any) => {
  console.log('modelItem', modelItem);
  const { resumeJsonNewStore } = appStore.useResumeJsonNewStore;
  const index = resumeJsonNewStore.COMPONENTS.findIndex((item) => item.keyId === modelItem.keyId); // 需要复制的模块的索引
  const deepItem = cloneDeep(modelItem);
  deepItem.keyId = getUuid();
  resumeJsonNewStore.COMPONENTS.splice(index, 0, deepItem);
  console.log('最新的resumeJsonNewStore', resumeJsonNewStore.COMPONENTS);
};
