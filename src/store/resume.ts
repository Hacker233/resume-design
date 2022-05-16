import { defineStore } from 'pinia';
import { IResumeJson } from '@/types/model';
import TEMPLATE_JSON from '@/schema/model';

interface IResumeModel {
  model: string;
  title: string;
  index: number;
}

export const useResumeJsonStore = defineStore({
  id: 'resumeJson',
  state: (): IResumeJson => {
    return TEMPLATE_JSON;
  },
  getters: {},
  actions: {},
});

export const useResumeModelStore = defineStore({
  id: 'resumeModel', // id必填，且需要唯一
  state: (): IResumeModel => {
    return {
      model: '',
      title: '设置',
      index: -1 // 选中的索引
    };
  },
  getters: {},
  actions: {
    setResumeModel({ model, title, index }: IResumeModel) {
      // 直接通过this修改state
      // this.name = name;
      // this.sex = sex;
      // this.age = age;
      // 批量更新
      this.$patch({
        model,
        title,
        index
      });
    }
  }
});
