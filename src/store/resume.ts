import { defineStore } from 'pinia';
import IRESUMEJSON from '@/interface/resume';
import RESUME_JSON from '@/schema/resume';
import { IMATERIALITEM } from '@/interface/material';
import { cloneDeep } from 'lodash';

// 新的简历store
export const useResumeJsonNewStore = defineStore('resumeJsonNew', () => {
  let resume_json = cloneDeep(RESUME_JSON); // 简历数据
  let importJson = ref<IRESUMEJSON>(resume_json); // 导入的JSON数据
  let resumeJsonNewStore = ref<IRESUMEJSON>(resume_json);
  function changeResumeJsonData(obj: IRESUMEJSON) {
    resumeJsonNewStore.value = cloneDeep(obj);
  }
  function changeImportJsonData(obj: IRESUMEJSON) {
    importJson.value = cloneDeep(obj);
  }
  function pushComponent(data: IMATERIALITEM) {
    resumeJsonNewStore.value.COMPONENTS.push(data);
  }
  function resetResumeJson() {
    resumeJsonNewStore.value = cloneDeep(RESUME_JSON);
  }

  return {
    resumeJsonNewStore,
    importJson,
    changeResumeJsonData,
    changeImportJsonData,
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
