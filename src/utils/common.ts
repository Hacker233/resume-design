import { uuid } from 'vue-uuid';
// 工具方法--px转数字
export const pxTonumber = (value: string | undefined): number => {
  if (value) {
    return Number(value.split('px')[0]);
  } else {
    return 0;
  }
};
// 生成uuid
export const getUuid = (): string => {
  return uuid.v4();
};

// 获取assets静态资源
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
};
