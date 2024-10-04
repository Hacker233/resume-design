import { useGetCustomCssByProp } from '../../hooks/useGetCustomCssByProp';
import { useGetSelectedModule } from '../../hooks/useGetSelectedModule';

export function useModuleWithStyle(id: string, customCssProp?: string) {
  const module = ref<any>(null);

  if (customCssProp && customCssProp !== '') {
    const moduleReal = useGetSelectedModule(id);
    module.value = useGetCustomCssByProp(customCssProp, moduleReal);
  } else {
    module.value = useGetSelectedModule(id);
  }

  return {
    module
  };
}
