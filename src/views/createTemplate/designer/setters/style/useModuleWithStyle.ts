import appStore from '@/store';
import { useGetCustomCssByProp } from '../../hooks/useGetCustomCssByProp';
import { useGetSelectedModule } from '../../hooks/useGetSelectedModule';
import { storeToRefs } from 'pinia';
import { useGetPageCustomCssByProp } from '../../hooks/useGetPageCustomCssByProp';

export function useModuleWithStyle(id: any, customCssProp?: string) {
  const module = ref<any>(null);

  // 如果有id，则返回module，否则返回整体JSON
  if (id) {
    if (customCssProp && customCssProp !== '') {
      const moduleReal = useGetSelectedModule(id);
      module.value = useGetCustomCssByProp(customCssProp, moduleReal);
    } else {
      module.value = useGetSelectedModule(id);
    }
  } else {
    const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
    if (customCssProp && customCssProp !== '') {
      module.value = useGetPageCustomCssByProp(customCssProp);
    } else {
      module.value = HJNewJsonStore.value;
    }
  }

  return {
    module
  };
}
