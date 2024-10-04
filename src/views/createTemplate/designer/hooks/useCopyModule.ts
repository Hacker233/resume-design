import appStore from '@/store';
import { getUuid } from '@/utils/common';
import { cloneDeep } from 'lodash';

/**
 * @description 复制组件
 */
export const useCopyModule = () => {
  const { HJNewJsonStore, selectedModuleId } = appStore.useCreateTemplateStore;
  for (let i = 0; i < HJNewJsonStore.componentsTree.length; i++) {
    const element = HJNewJsonStore.componentsTree[i];
    if (element.id === selectedModuleId) {
      const newModule = cloneDeep(element);
      newModule.id = getUuid();
      HJNewJsonStore.componentsTree.splice(i + 1, 0, newModule);
    }
  }
};
