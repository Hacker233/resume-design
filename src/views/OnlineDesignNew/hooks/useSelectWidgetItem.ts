import appStore from '@/store';
import { storeToRefs } from 'pinia';

const findComponentById = (id: string, componentTree: any) => {
  for (const component of componentTree) {
    if (component.id === id) {
      return component; // 找到匹配的组件，返回它
    }
    if (component.children && component.children.length > 0) {
      const found: any = findComponentById(id, component.children);
      if (found) {
        return found; // 在子组件中找到，返回它
      }
    }
  }
  return null; // 没有找到
};

// 获取选中的组件数据
const useSelectWidgetItem = (id: string) => {
  const { HJSchemaJsonStore } = storeToRefs(appStore.useOnlineDesignNewJsonStore);
  const widgetItem = findComponentById(id, HJSchemaJsonStore.value.componentsTree);

  return {
    widgetItem
  };
};

export default useSelectWidgetItem;

// 根据组件id查询出组件数据
export const useGetWidgetItemById = (id: string) => {
  const { HJSchemaJsonStore } = storeToRefs(appStore.useOnlineDesignNewJsonStore);
  const widgetItem = reactive(findComponentById(id, HJSchemaJsonStore.value.componentsTree));

  return {
    widgetItem
  };
};
