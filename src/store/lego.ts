import { HJSchema } from '@/views/LegoDesigner/schema';
import { IHJSchema } from '@/views/LegoDesigner/types';
import { cloneDeep } from 'lodash';
import { defineStore } from 'pinia';
import appStore from '.';

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

// 页面中选中的widget相关信息
export const useLegoSelectWidgetStore = defineStore('legoSelectWidgetStore', () => {
  const selectedWidgetId = ref<string>(''); // 选中的组件id
  const widgetActiveObj = ref<any>({}); // 组件选中状态对象
  const pageActiveIndex = ref<number>(-1); // 当前页码

  function setSelectedWidgetId(value: string) {
    selectedWidgetId.value = value;
  }

  function setWidgetActiveObj(id: string, value: boolean) {
    widgetActiveObj.value[id] = value;
  }

  // 重置选中状态
  function resetSelectWidget() {
    selectedWidgetId.value = '';
    widgetActiveObj.value = {};
    pageActiveIndex.value = -1;
  }

  return {
    selectedWidgetId,
    widgetActiveObj,
    pageActiveIndex,
    setSelectedWidgetId,
    setWidgetActiveObj,
    resetSelectWidget
  };
});

// 撤销与恢复相关store
export const useUndoAndRedoStore = defineStore('undoAndRedoStore', () => {
  const limit = 10; // 可缓存的步骤数
  const undoCommands = ref<any>([]); // 撤销数组
  const redoCommands = ref<any>([]); // 恢复数组
  const { changeHJSchemaJsonData } = appStore.useLegoJsonStore;
  // 撤销
  function undo() {
    if (!undoCommands.value.length) {
      return;
    }
    console.log('undoCommands', undoCommands);
    const last = cloneDeep(undoCommands.value[undoCommands.value.length - 1]);
    changeHJSchemaJsonData(last);
    undoCommands.value.pop();
    if (redoCommands.value.length >= limit) {
      redoCommands.value.shift();
      redoCommands.value.push(last);
    } else {
      redoCommands.value.push(last); // 插入恢复数组
    }
  }
  // 恢复
  function redo() {
    if (!redoCommands.value.length) {
      return;
    }
    const { changeHJSchemaJsonData } = appStore.useLegoJsonStore;
    const last = cloneDeep(redoCommands.value[redoCommands.value.length - 1]);
    changeHJSchemaJsonData(last);
    redoCommands.value.pop();
    if (undoCommands.value.length >= limit) {
      undoCommands.value.shift();
      undoCommands.value.push(last);
    } else {
      undoCommands.value.push(last); // 插入恢复数组
    }
  }
  // 缓存
  function insertCache(HJJson: IHJSchema) {
    if (undoCommands.value.length >= 10) {
      undoCommands.value.shift();
      undoCommands.value.push(cloneDeep(HJJson));
    } else {
      undoCommands.value.push(cloneDeep(HJJson));
    }
  }
  return {
    limit,
    undoCommands,
    redoCommands,
    undo,
    redo,
    insertCache
  };
});
