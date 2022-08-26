import IMODELSTYLE from '@/interface/modelStyle';
import { pxTonumber } from '@/utils/common';

const useGetLineLeft = (modelStyle: IMODELSTYLE) => {
  const left = computed(() => {
    return pxTonumber(modelStyle.pLeftRight) - 15 + 'px';
  });
  return {
    left
  };
};
export default useGetLineLeft;
