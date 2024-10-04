import appStore from '@/store';

/**
 * @description 删除组件
 */
export const useDeleteModule = () => {
  const { HJNewJsonStore, selectedModuleId } = appStore.useCreateTemplateStore;
  for (let i = 0; i < HJNewJsonStore.componentsTree.length; i++) {
    const element = HJNewJsonStore.componentsTree[i];
    if (element.id === selectedModuleId) {
      HJNewJsonStore.componentsTree.splice(i, 1);
    }
  }
};
