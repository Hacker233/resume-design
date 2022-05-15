import { defineStore } from 'pinia';

interface IResumeModel {
  model: string;
  title: string;
  index: number;
}

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
