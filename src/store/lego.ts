import { HJSchema } from '@/views/LegoDesigner/schema';
import { IHJSchema } from '@/views/LegoDesigner/types';
import { cloneDeep } from 'lodash';
import { defineStore } from 'pinia';

// 积木搭建的页面schema JSON store
export const useLegoJsonStore = defineStore('legoJsonStore', () => {
  const HJ_JSON = cloneDeep(HJSchema); // 页面数据数据
  const importJson = ref<IHJSchema>(HJ_JSON); // 导入的JSON数据
  const HJSchemaJsonStore = ref<IHJSchema>(HJ_JSON);
  function changeHJSchemaJsonData(obj: IHJSchema) {
    HJSchemaJsonStore.value = cloneDeep(obj);
  }
  function changeImportJsonData(obj: IHJSchema) {
    importJson.value = cloneDeep(obj);
  }
  function pushComponent(data: any, pageIndex: number) {
    return HJSchemaJsonStore.value.componentsTree[pageIndex].children.push(data) - 1; // 返回插入后的索引
  }
  function resetHJSchemaJsonData() {
    HJSchemaJsonStore.value = cloneDeep(HJ_JSON);
  }

  return {
    HJSchemaJsonStore,
    importJson,
    changeHJSchemaJsonData,
    changeImportJsonData,
    pushComponent,
    resetHJSchemaJsonData
  };
});
