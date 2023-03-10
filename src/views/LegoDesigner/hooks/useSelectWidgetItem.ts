import appStore from '@/store';
import { storeToRefs } from 'pinia';

// 获取选中的组件数据
const useSelectWidgetItem = (id: string, pageIndex: number) => {
  const { HJSchemaJson } = storeToRefs(appStore.useLegoJsonStore);
  const widgetItem = reactive(
    HJSchemaJson.value.componentsTree[pageIndex].children.find(
      (item: { id: string }) => item.id === id
    )
  ); // 通过id获取选中的模块

  return {
    widgetItem
  };
};
export default useSelectWidgetItem;
