import { defineStore } from 'pinia';
import { cloneDeep } from 'lodash';
import { HJNewSchema } from '@/views/createTemplate/designer/schema/template';
import { IHJNewSchema, IModule } from '@/views/createTemplate/types/IHJNewSchema';

// 创建在线制作模版store
export const useCreateTemplateStore = defineStore('createTemplate', () => {
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
    HJNewJsonStore,
    changeResumeJsonData,
    pushComponent,
    resetResumeJson
  };
});
