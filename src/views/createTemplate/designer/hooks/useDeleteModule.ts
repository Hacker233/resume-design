import appStore from '@/store';
import { storeToRefs } from 'pinia';

/**
 * @description 删除组件
 */
export const useDeleteModule = () => {
  const { HJNewJsonStore, selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);
  for (let i = 0; i < HJNewJsonStore.value.componentsTree.length; i++) {
    const element = HJNewJsonStore.value.componentsTree[i];
    if (element.id === selectedModuleId.value) {
      HJNewJsonStore.value.componentsTree.splice(i, 1);
    }
  }
};
