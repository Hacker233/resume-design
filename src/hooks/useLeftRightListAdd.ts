import appStore from '@/store';

// 增加自定义模块时，左右布局需要单独添加
export const useLeftRightListAdd = (layout: string, item: any, leftList: any, rightList: any) => {
  const { resumeJsonNewStore } = appStore.useResumeJsonNewStore;
  if (layout === 'left') {
    leftList.value.push(item);
  } else {
    rightList.value.push(item);
  }
  resumeJsonNewStore.COMPONENTS = leftList.value.concat(rightList.value);
};
