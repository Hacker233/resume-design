import { defineStore } from 'pinia';
import { cloneDeep } from 'lodash';
import { HJNewSchema } from '@/views/createTemplate/designer/schema/template';
import { IHJNewSchema, IModule } from '@/views/createTemplate/types/IHJNewSchema';

// 创建在线制作模版store
export const useCreateTemplateStore = defineStore('createTemplate', () => {
  const selectedModuleListId = ref<string>(''); // 选中的模块列表的id
  const selectedModuleId = ref<string>(''); // 选中的模块的id
  const selectedPageName = ref<string>('BasePage'); // 选中的页面背景的名称
  const resume_json = cloneDeep(HJNewSchema); // 简历数据
  const moduleDataConfigRefList = ref<any>({}); // 存储数据配置页面每个组件的ref
  const HJNewJsonStore = ref<IHJNewSchema>(resume_json);
  const resetKey = ref<number>(0);
  const fromAiGenerate = ref<boolean>(false); // 是否来源于AI生成的简历
  function changeResumeJsonData(obj: IHJNewSchema) {
    HJNewJsonStore.value = cloneDeep(obj);
  }
  function pushComponent(data: IModule) {
    HJNewJsonStore.value.componentsTree.push(data);
  }
  function resetResumeJson() {
    HJNewJsonStore.value = cloneDeep(HJNewSchema);
  }
  // 数据配置项滚动到可是区域
  function dataConfigScrollToView() {
    setTimeout(() => {
      if (Object.keys(moduleDataConfigRefList.value).length && selectedModuleId.value) {
        moduleDataConfigRefList.value[selectedModuleId.value].el.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        }); // 该模块显示在可视区域内
      }
    }, 0);
  }

  return {
    selectedModuleId,
    selectedModuleListId,
    selectedPageName,
    HJNewJsonStore,
    moduleDataConfigRefList,
    resetKey,
    dataConfigScrollToView,
    changeResumeJsonData,
    pushComponent,
    resetResumeJson,
    fromAiGenerate
  };
});
