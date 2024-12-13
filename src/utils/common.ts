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

// 获取简历背景小图片资源
export const getAssetsResumeBgcFile = (url: string) => {
  return new URL(`../assets/images/resumeBackground/${url}`, import.meta.url).href;
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

//

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

function getTs(time: any) {
  const arr = time.split(/[- :]/);
  const _date: any = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
  const timeStr = Date.parse(_date);
  return timeStr;
}
// 时间处理函数、几天前、刚刚
export const showtime = (post_modified: any) => {
  // 拿到当前时间戳和发布时的时间戳，然后得出时间戳差
  const curTime = new Date();
  const timeDiff = curTime.getTime() - getTs(post_modified);

  // 单位换算
  const min = 60 * 1000;
  const hour = min * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = week * 4;
  const year = month * 12;

  // 计算发布时间距离当前时间的周、天、时、分
  const exceedyear = Math.floor(timeDiff / year);
  const exceedmonth = Math.floor(timeDiff / month);
  const exceedWeek = Math.floor(timeDiff / week);
  const exceedDay = Math.floor(timeDiff / day);
  const exceedHour = Math.floor(timeDiff / hour);
  const exceedMin = Math.floor(timeDiff / min);

  // 最后判断时间差到底是属于哪个区间，然后return

  if (exceedyear < 100 && exceedyear > 0) {
    return '发表于' + exceedyear + '年前';
  } else {
    if (exceedmonth < 12 && exceedmonth > 0) {
      return exceedmonth + '月前';
    } else {
      if (exceedWeek < 4 && exceedWeek > 0) {
        return exceedWeek + '周前';
      } else {
        if (exceedDay < 7 && exceedDay > 0) {
          return exceedDay + '天前';
        } else {
          if (exceedHour < 24 && exceedHour > 0) {
            return exceedHour + '小时前';
          } else {
            if (exceedMin == 0) {
              return '刚刚发表';
            } else {
              return exceedMin + '分钟前';
            }
          }
        }
      }
    }
  }
};

// file转换为大小
export const getFileSize = (fileByte: number) => {
  const fileSizeByte = fileByte;
  let fileSizeMsg = '';
  if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + 'KB';
  else if (fileSizeByte == 1048576) fileSizeMsg = '1MB';
  else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824)
    fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + 'MB';
  else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = '1GB';
  else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776)
    fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  else fileSizeMsg = '文件超过1TB';
  return fileSizeMsg;
};

// 数字转化为k、w显示
export const formatNumber = (num: number) => {
  return num >= 1e3 && num < 1e4
    ? (num / 1e3).toFixed(1) + 'k'
    : num >= 1e4
    ? (num / 1e4).toFixed(1) + 'w'
    : num;
};

// 将扁平数组转化成树形数组
export const buildTree = (items: any) => {
  // 创建一个映射，用于快速查找父节点
  const map: any = {};
  items.forEach((item: any) => (map[item._id] = { ...item, children: [] }));

  // 创建一个结果数组，存放最终的树形结构
  const tree: Array<any> = [];

  // 遍历所有项，将它们添加到其父节点的children数组中
  items.forEach((item: any) => {
    // 如果parentId为空，说明是根节点
    if (item.parentId === '') {
      // 添加到结果数组中
      tree.push(map[item._id]);
    } else {
      // 否则，找到其父节点并添加子节点
      if (map[item.parentId]) {
        map[item.parentId].children.push(map[item._id]);
      }
    }
  });

  // 返回最终的树形结构
  return tree;
};

// 获取assets目录下的images目录下的静态资源
export const getAssetsImagesFile = (url: string) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
};

// 将数字转换为带有千分位逗号的字符串
export const formatNumberWithCommas = (number: any) => {
  if (!Number.isInteger(number)) {
    return 0;
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 移除对象的空值属性，包括null、undefined、空字符串。不含深层次的空值属性
 * @param obj 对象类型
 * @returns 处理后的对象
 */
export function deleteNull(obj: object) {
  return Object.entries(obj).reduce((a: any, [k, v]: Array<any>) => {
    if (v == null || v === '' || String(v).trim() === '') return a;
    a[k] = v;
    return a;
  }, {});
}

// 获取assets/images/moduleTitle文件下的图片
export const getModuleTitleImagesFile = (url: string) => {
  const isOnlineUrl = url.includes('https://');
  if (isOnlineUrl) {
    return url;
  } else {
    return new URL(`../assets/images/moduleTitle/${url}`, import.meta.url).href;
  }
};
