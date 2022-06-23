import { defineStore } from 'pinia';
import { IResumeJson } from '@/types/model';
import TEMPLATE_JSON from '@/schema/model';

interface IResumeModel {
  model: string;
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
      model: '',
      title: '全局样式设置',
      id: '' // 选中的id
    };
  },
  getters: {},
  actions: {
    setResumeModel({ model, title, id }: IResumeModel) {
      // 直接通过this修改state
      // this.name = name;
      // this.sex = sex;
      // this.age = age;
      // 批量更新
      this.$patch({
        model,
        title,
        id
      });
    }
  }
});
