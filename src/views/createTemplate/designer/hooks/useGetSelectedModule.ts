import appStore from '@/store';
import { storeToRefs } from 'pinia';

export const useGetSelectedModule = (id: any) => {
  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
  for (let i = 0; i < HJNewJsonStore.value.componentsTree.length; i++) {
    if (id === HJNewJsonStore.value.componentsTree[i].id) {
      return HJNewJsonStore.value.componentsTree[i];
    }
  }
  return null;
};
