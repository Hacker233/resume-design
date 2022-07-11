import { defineStore } from 'pinia';
import { IResumeJson } from '@/interface/model';
import TEMPLATE_JSON from '@/schema/model';

interface IResumeModel {
  model: string;
  optionsName: string;
  title: string;
  id: string;
}

export const useResumeJsonStore = defineStore({
  id: 'resumeJson',
  state: () => {
    return {
      resumeJsonStore: TEMPLATE_JSON
    };
  },
  getters: {},
  actions: {
    changeResumeJsonData(obj: IResumeJson) {
      this.resumeJsonStore = obj;
    }
  }
});

export const useResumeModelStore = defineStore({
  id: 'resumeModel', // id必填，且需要唯一
  state: (): IResumeModel => {
    return {
      model: '', // 选中的模块名称
      optionsName: '', // 需要使用的属性设置面板组件名
      title: '全局样式设置',
      id: '' // 选中的id
    };
  },
  getters: {},
  actions: {
    setResumeModel({ model, optionsName, title, id }: IResumeModel) {
      // 批量更新
      this.$patch({
        model,
        optionsName,
        title,
        id
      });
    }
  }
});
