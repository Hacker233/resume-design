import { uuid } from 'vue-uuid';
import moment from 'moment'; // 日期处理
import appStore from '@/store';
import * as imageConversion from 'image-conversion'; // 图片压缩
// 工具方法--px转数字
export const pxTonumber = (value: string | undefined): number => {
  if (value) {
    return Number(value.split('px')[0]);
  } else {
    return 0;
  }
};
// 工具方法--熟练度文字转数值
export const textToNumber = (value: string): number => {
  let number = 0;
  switch (value) {
    case '了解':
      number = 25;
      break;
    case '一般':
      number = 50;
      break;
    case '熟悉':
      number = 75;
      break;
    case '精通':
      number = 100;
      break;
  }
  return number;
};

// 工具方法--数值转熟练度文字方法
// 熟练度
export const numberToText = (value: number) => {
  if (value <= 25) {
    return '一般';
  } else if (value <= 50) {
    return '掌握';
  } else if (value <= 75) {
    return '熟练';
  } else {
    return '精通';
  }
};

// 生成uuid
export const getUuid = (): string => {
  return uuid.v4().split('-').join('');
};

// 获取assets静态资源
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
};

// 获取assets/material下的静态资源
export const getAssetsMaterialFile = (path: string, url: string) => {
  return new URL(`../assets/images/material/${path}/${url}`, import.meta.url).href;
};

// 时间格式转化：['2015-5', '2019-6'] -> 2015.05 - 2019.06
export const formatDate = (dataArray: Array<string> | string): string => {
  if (Array.isArray(dataArray)) {
    const startDate = moment(new Date(dataArray[0])).format('YYYY.MM').split('-').join('.');
    let endDate;
    if (dataArray[1] === '至今') {
      endDate = '至今';
    } else {
      endDate = moment(new Date(dataArray[1])).format('YYYY.MM').split('-').join('.');
    }
    return `${startDate}-${endDate}`;
  } else {
    return moment(new Date(dataArray)).format('YYYY.MM').split('-').join('.');
  }
};

// 日期格式话 日期格式化为 某年某月某日格式
export const formatDateToYMD = (dateString: string): string => {
  if (dateString) {
    return moment(new Date(dateString)).format('YYYY 年 MM 月 DD 日');
  } else {
    return '暂无数据';
  }
};

// 开启全局等待层
export const openGlobalLoading = () => {
  const { changLoading } = appStore.useLoadingStore;
  changLoading(true);
};
// 关闭全局等待层
export const closeGlobalLoading = () => {
  const { changLoading } = appStore.useLoadingStore;
  changLoading(false);
};
// 先开启等待层，然后指定时间关闭等待层
export const openAndCloseLoadingByTime = (time: number) => {
  openGlobalLoading();
  setTimeout(() => {
    closeGlobalLoading();
  }, time);
};

// 判断是否需要删除本地数据, 不是版本2的需要重置
export const checkVersion = () => {
  const version = localStorage.getItem('version');
  if (!version) {
    localStorage.removeItem('resumeDraft'); // 移出本地简历数据
  } else {
    if (Number(version) !== 6) {
      localStorage.removeItem('resumeDraft'); // 移出本地简历数据
    }
  }
  localStorage.setItem('version', '6'); // 存入版本
};

// 判断是否是JSON格式
export const isJSON = (str: string): boolean => {
  if (typeof str == 'string') {
    try {
      const obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
};

// 格式化日期
export const formatListDate = (value: string) => {
  return moment(new Date(value)).format('YYYY-MM-DD HH:mm:ss');
};

// 根据链接下载文件
export const downloadFileUtil = (url: string) => {
  const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  const isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
  if (isChrome || isSafari) {
    const link = document.createElement('a');
    link.href = url;
    if (link.download !== undefined) {
      const fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
      link.download = fileName;
    }
    if (document.createEvent) {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }
  if (url.indexOf('?') === -1) {
    url += '?download';
  }
  window.open(url, '_self');
  return true;
};

// 压缩文件
export const compressFile = (file: File, mag: number) => {
  return new Promise(async (resolve, reject) => {
    const res = await imageConversion.compress(file, mag); // 压缩图片
    // blob 转file
    const files = new window.File([res], file.name, {
      type: file.type
    });
    if (files) {
      resolve(files);
    } else {
      reject(null);
    }
  });
};
