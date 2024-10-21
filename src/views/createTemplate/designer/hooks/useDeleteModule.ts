import appStore from '@/store';
import { storeToRefs } from 'pinia';

/**
 * @description 删除组件
 */
export const useDeleteModule = (id?: string) => {
  const { HJNewJsonStore, selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);
  for (let i = 0; i < HJNewJsonStore.value.componentsTree.length; i++) {
    const element = HJNewJsonStore.value.componentsTree[i];
    if (id) {
      if (element.id === id) {
        HJNewJsonStore.value.componentsTree.splice(i, 1);
      }
    } else {
      if (element.id === selectedModuleId.value) {
        HJNewJsonStore.value.componentsTree.splice(i, 1);
      }
    }
  }
};
