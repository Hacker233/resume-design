import { defineStore } from 'pinia';
import IRESUMEJSON from '@/interface/resume';
import RESUME_JSON from '@/schema/resume';
import { IMATERIALITEM } from '@/interface/material';

// 新的简历store
export const useResumeJsonNewStore = defineStore('resumeJsonNew', () => {
  let resumeJsonNewStore = ref<IRESUMEJSON>(RESUME_JSON);
  function changeResumeJsonData(obj: IRESUMEJSON) {
    resumeJsonNewStore.value = obj;
  }
  function pushComponent(data: IMATERIALITEM) {
    resumeJsonNewStore.value.COMPONENTS.push(data);
  }
  function resetResumeJson() {
    resumeJsonNewStore.value = RESUME_JSON;
  }

  return {
    resumeJsonNewStore,
    changeResumeJsonData,
    pushComponent,
    resetResumeJson
  };
});

export const useSelectMaterialStore = defineStore('selectMaterialStore', () => {
  const cptName = ref<string>(''); // 选中的模块名称
  const cptOptionsName = ref<string>(''); // 选中的组件属性面板名称
  const cptTitle = ref<string>('全局主题设置'); // 选中的模块名称
  const cptKeyId = ref<string>(''); // 选中的模块KeyID

  // 更新
  function updateSelectModel(
    cptNameTxt: string,
    cptOptionsNameTxt: string,
    cptTitleTxt: string,
    cptKeyIdTxt: string
  ) {
    cptName.value = cptNameTxt;
    cptOptionsName.value = cptOptionsNameTxt;
    cptTitle.value = cptTitleTxt;
    cptKeyId.value = cptKeyIdTxt;
  }
  // 重置
  function resetSelectModel() {
    cptName.value = '';
    cptOptionsName.value = '';
    cptTitle.value = '全局主题设置';
    cptKeyId.value = '';
  }
  return {
    cptName,
    cptOptionsName,
    cptTitle,
    cptKeyId,
    updateSelectModel,
    resetSelectModel
  };
});