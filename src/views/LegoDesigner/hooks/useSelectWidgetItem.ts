import appStore from '@/store';
import { storeToRefs } from 'pinia';

// 获取选中的组件数据
const useSelectWidgetItem = (id: string) => {
  const { HJSchemaJson } = storeToRefs(appStore.useLegoJsonStore);
  const widgetItem = reactive(HJSchemaJson.value.componentsTree.find((item) => item.id === id)); // 通过id获取选中的模块

  return {
    widgetItem
  };
};
export default useSelectWidgetItem;
