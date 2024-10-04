import { defineStore } from 'pinia';
import { cloneDeep } from 'lodash';
import { HJNewSchema } from '@/views/createTemplate/designer/schema/template';
import { IHJNewSchema, IModule } from '@/views/createTemplate/types/IHJNewSchema';

// 创建在线制作模版store
export const useCreateTemplateStore = defineStore('createTemplate', () => {
  const selectedModuleListId = ref<string>(''); // 选中的模块列表的id
  const selectedModuleId = ref<string>(''); // 选中的模块的id
  const resume_json = cloneDeep(HJNewSchema); // 简历数据
  const HJNewJsonStore = ref<IHJNewSchema>(resume_json);
  function changeResumeJsonData(obj: IHJNewSchema) {
    HJNewJsonStore.value = cloneDeep(obj);
  }
  function pushComponent(data: IModule) {
    HJNewJsonStore.value.componentsTree.push(data);
  }
  function resetResumeJson() {
    HJNewJsonStore.value = cloneDeep(HJNewSchema);
  }

  return {
    selectedModuleId,
    selectedModuleListId,
    HJNewJsonStore,
    changeResumeJsonData,
    pushComponent,
    resetResumeJson
  };
});
