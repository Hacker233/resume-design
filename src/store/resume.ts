import { defineStore } from 'pinia';
import { IResumeJson } from '@/interface/model';
import TEMPLATE_JSON from '@/schema/model';
import { ref } from 'vue';

export const useResumeJsonStore = defineStore('resumeJson', () => {
  const resumeJsonStore = ref<IResumeJson>(TEMPLATE_JSON);
  function changeResumeJsonData(obj: IResumeJson) {
    resumeJsonStore.value = obj;
  }

  return {
    resumeJsonStore,
    changeResumeJsonData
  };
});

export const useResumeModelStore = defineStore('resumeModel', () => {
  const model = ref<string>(''); // 选中的模块名称
  const optionsName = ref<string>(''); // 需要使用的属性设置面板组件名
  const title = ref<string>('主题设置');
  const id = ref<string>(''); // 选中的id
  function setResumeModel(
    modelTxt: string,
    optionsNameTxt: string,
    titleTxt: string,
    idTxt: string
  ) {
    model.value = modelTxt;
    optionsName.value = optionsNameTxt;
    title.value = titleTxt;
    id.value = idTxt;
  }
  function storeReset() {
    model.value = '';
    optionsName.value = '';
    title.value = '主题设置';
    id.value = '';
  }
  return {
    model,
    optionsName,
    title,
    id,
    setResumeModel,
    storeReset
  };
});
