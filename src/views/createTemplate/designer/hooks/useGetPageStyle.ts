import { storeToRefs } from 'pinia';
import appStore from '@/store';

// 返回最外层样式
export const useGetPageStyle = () => {
  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
  const pageStyle = {
    width: `${HJNewJsonStore.value.css.width}px`,
    minHeight: `${HJNewJsonStore.value.css.height}px`,
    background: HJNewJsonStore.value.css.background || '#ffffff',
    opacity: HJNewJsonStore.value.css.opacity,
    backgroundImage: HJNewJsonStore.value.css.backgroundImage || '',
    fontFamily: HJNewJsonStore.value.css.fontFamily || ''
  };

  return pageStyle;
};
