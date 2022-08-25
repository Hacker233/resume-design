import appStore from '@/store';
import { pxTonumber } from '@/utils/common';

const useGetLineLeft = () => {
  const { resumeJsonNewStore } = appStore.useResumeJsonNewStore;
  const left = computed(() => {
    return pxTonumber(resumeJsonNewStore.GLOBAL_STYLE.pLeftRight) - 15 + 'px';
  });
  const themeColor = resumeJsonNewStore.GLOBAL_STYLE.themeColor;
  return {
    themeColor,
    left
  };
};
export default useGetLineLeft;
