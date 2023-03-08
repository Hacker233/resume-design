import { HJSchema } from '@/views/LegoDesigner/schema';
import { IHJSchema } from '@/views/LegoDesigner/types';
import { cloneDeep } from 'lodash';
import { defineStore } from 'pinia';

// 积木搭建的页面schema JSON store
export const useLegoJsonStore = defineStore('resumeJsonNew', () => {
  const HJ_JSON = cloneDeep(HJSchema); // 页面数据数据
  const importJson = ref<IHJSchema>(HJ_JSON); // 导入的JSON数据
  const HJSchemaJson = ref<IHJSchema>(HJ_JSON);
  function changeHJSchemaJsonData(obj: IHJSchema) {
    HJSchemaJson.value = cloneDeep(obj);
  }
  function changeImportJsonData(obj: IHJSchema) {
    importJson.value = cloneDeep(obj);
  }
  function pushComponent(data: any) {
    HJSchemaJson.value.componentsTree.push(data);
  }
  function resetHJSchemaJsonData() {
    HJSchemaJson.value = cloneDeep(HJ_JSON);
  }

  return {
    HJSchemaJson,
    importJson,
    changeHJSchemaJsonData,
    changeImportJsonData,
    pushComponent,
    resetHJSchemaJsonData
  };
});
