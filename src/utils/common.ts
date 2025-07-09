import { uuid } from 'vue-uuid';
import moment from 'moment'; // 日期处理
import appStore from '@/store';
import * as imageConversion from 'image-conversion'; // 图片压缩
import { cloneDeep } from 'lodash';
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
export const getAssetsImagesFile = (url: string): string => {
  // 更新后的 import.meta.glob 用法
  const modules = import.meta.glob('/src/assets/images/**/*', {
    query: '?url',
    import: 'default',
    eager: true
  });

  const imagePath = `/src/assets/images/${url}`;
  return typeof modules[imagePath] === 'string' ? modules[imagePath] : '';
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

/**
 * 处理简历 JSON 数据
 * @param {Object} resumeData - 原始简历数据
 * @returns {Object} - 处理后的简历数据
 */
export const processResumeData = (resumeData: any, useId?: boolean) => {
  const processedData: { [key: string]: any } = {};

  // 遍历每个模块
  resumeData.componentsTree.forEach((module: any, index: number) => {
    // 如果 showModule 为 false，跳过该模块
    if (module.customProps?.showModule === false) {
      return;
    }

    // 自定义较短的键名，例如 module_1, module_2
    const moduleKey = useId ? module.id : `module_${index + 1}`;

    // 处理模块的 props，过滤 show 为 false 的属性
    const moduleData: any = { _title: module.title }; // 将 title 存放在 _title 字段中
    for (const [key, prop] of Object.entries(module.props || {})) {
      if ((prop as any).show !== false) {
        // 如果属性是 dataSource，直接使用其 value
        if (module.dataSource && module.dataSource[key]) {
          moduleData[key] = module.dataSource[key].value;
        } else {
          moduleData[key] = (prop as any).value || (prop as any).chName || '';
        }
      }
    }

    // 如果模块有 list 数据，处理 list
    if (module.dataSource?.list) {
      moduleData.list = module.dataSource.list.value.map((item: any) => {
        const processedItem: any = {};
        // 遍历对象的每个键值对
        for (const entry of Object.entries(item)) {
          const itemKey: string = entry[0]; // itemKey 是字符串类型
          const itemProp: any = entry[1]; // itemProp 可以是任意类型

          // 如果 itemProp 的 show 属性为 false，跳过该字段
          if (module.props[itemKey]?.show === false) {
            continue;
          }
          // 如果 itemProp 是数组，单独处理
          if (Array.isArray(itemProp.value)) {
            processedItem[itemKey] = itemProp.value.map((element: any) => {
              // 如果元素是字符串，直接保留
              if (typeof element === 'string') {
                return element;
              }
              // 如果元素是对象，递归处理
              else if (typeof element === 'object') {
                return processItem(element);
              }
              // 其他情况（如数字、布尔值等），直接保留
              return element;
            });
          }
          // 如果 itemProp 是一个对象且包含 value 属性，提取 value
          else if (itemProp !== null && typeof itemProp === 'object' && 'value' in itemProp) {
            processedItem[itemKey] = itemProp.value;
          }
          // 如果 itemProp 是字符串、数字，直接保留
          else if (typeof itemProp === 'string' || typeof itemProp === 'number') {
            processedItem[itemKey] = itemProp;
          }
          // 如果 itemProp 是对象，递归处理
          else if (typeof itemProp === 'object') {
            processedItem[itemKey] = processItem(itemProp);
          }
        }

        return processedItem;
      });
    }

    // 将处理后的模块数据添加到结果中
    processedData[moduleKey] = moduleData;
  });

  return processedData;
};

/**
 * 递归处理 item 数据，只保留 value 或实际内容
 * @param {Object} item - 待处理的数据
 * @returns {Object} - 处理后的数据
 */
const processItem = (item: any) => {
  const processedItem: any = {};
  for (const entryItem of Object.entries(item)) {
    const key: string = entryItem[0];
    const value: any = entryItem[1];

    if (typeof value === 'object' && value.value !== undefined) {
      // 如果 value 是一个对象且包含 value 字段，则只提取 value
      processedItem[key] = value?.value ?? null;
    } else if (typeof value === 'string' || typeof value === 'number' || Array.isArray(value)) {
      // 如果 value 是字符串、数字或数组，直接保留
      processedItem[key] = value;
    } else if (typeof value === 'object') {
      // 如果 value 是对象，递归处理
      processedItem[key] = processItem(value);
    }
  }
  return processedItem;
};

// 将简历中的JSON数据提取出来
export const extractResumeData = (resumeData: any, filterNotShowModule?: boolean) => {
  const extractedData: any = {};

  // 遍历每个模块
  resumeData.componentsTree.forEach((module: any) => {
    // 如果filterNotShowModule为true且模块不显示，则跳过
    if (filterNotShowModule && module.customProps?.showModule === false) {
      return;
    }
    // 截取 id 的最后十位
    const shortId = module.id.slice(-10);
    extractedData[shortId] = {};
    extractedData[shortId].moduleContent = extractContentData(cloneDeep(module.dataSource));
    extractedData[shortId].moduleTitle = module.title;
  });

  return extractedData;
};

// 将content中的简历内容提取出来
export const extractContentData = (contentData: any) => {
  const content: any = {};
  // 如果有list字段，list字段是一个对象
  if (contentData?.list) {
    content.list = {};
    content.list.value = processValue(contentData.list.value);
  } else {
    // 遍历每个模块
    Object.keys(contentData).forEach((key: any) => {
      const relKey = `${key}_${contentData[key].label}`;
      content[relKey] = {};
      content[relKey].value = processValue(contentData[key].value);
    });
  }
  return content;
};

// 处理value
// 定义递归类型
type ProcessedValue = string | number | ProcessedObject | ProcessedList;

interface ProcessedObject {
  [key: string]: ProcessedValue;
}

type ProcessedList = ProcessedValue[];

export const processValue = (value: any): ProcessedValue => {
  // 如果 value 是字符串或字符串数组，直接返回
  if (
    typeof value === 'string' ||
    (Array.isArray(value) && value.every((item) => typeof item === 'string'))
  ) {
    return value as ProcessedValue;
  }

  // 如果 value 是对象数组，递归处理每个对象
  if (Array.isArray(value)) {
    return value.map((item) => processValue(item)) as ProcessedList;
  }

  // 如果 value 是对象，处理每个属性
  if (typeof value === 'object' && value !== null) {
    const result: ProcessedObject = {};
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        const item = value[key];
        const relKey = `${key}_${item.label}`;
        if (typeof item === 'object' && item !== null && 'label' in item && 'value' in item) {
          // 只保留 label 和 value 字段
          result[relKey] = {
            value: processValue(item.value)
          } as ProcessedValue;
        } else {
          // 递归处理其他情况
          result[relKey] = processValue(item);
        }
      }
    }
    return result as ProcessedValue;
  }

  // 其他情况直接返回
  return value as ProcessedValue;
};

/**
 * @description 将数据JSON还原
 */
// 还原label字段
/**
 * 恢复数据函数
 * 该函数用于从给定的数据对象中恢复特定模块的内容
 * 它会遍历输入对象中的每个模块，确保每个模块包含必要的属性，并尝试恢复模块的内容
 * 如果模块不符合要求，则会跳过该模块；如果恢复过程中遇到错误，则会记录错误
 *
 * @param data 包含模块数据的对象，期望是一个非空的普通对象
 * @returns 返回恢复后的数据对象
 * @throws 如果输入数据不是非空的普通对象，则抛出TypeError
 */
export const restoreData = (data: any) => {
  // 定义常量，便于维护
  const MODULE_TITLE: any = 'moduleTitle';
  const MODULE_CONTENT: any = 'moduleContent';

  // 验证输入是否为对象类型
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new TypeError('Input data must be a non-null plain object');
  }

  // 初始化恢复后的数据对象
  const restoredData: any = {};

  // 遍历每个模块
  for (const [key, module] of Object.entries(data)) {
    try {
      // 检查模块是否包含必要属性
      if (
        typeof module !== 'object' ||
        module === null ||
        !(MODULE_TITLE in module) ||
        !(MODULE_CONTENT in module)
      ) {
        console.warn(`Skipping invalid module with key: ${key}`);
        continue;
      }

      // 恢复数据
      restoredData[key] = {
        [MODULE_TITLE]: (module as { [key: string]: any })[MODULE_TITLE], // 使用类型断言
        [MODULE_CONTENT]: restoreContentData((module as { [key: string]: any })[MODULE_CONTENT]) // 使用类型断言
      };
    } catch (error) {
      // 捕获并记录恢复内容时的异常
      console.error(`Error restoring content for module with key: ${key}`, error);
      throw error; // 重新抛出，调用方可以捕获并处理
    }
  }

  // 返回恢复后的数据对象
  return restoredData;
};

/**
 * 恢复内容数据的结构
 * 该函数旨在将具有特定格式的键和嵌套结构的数据对象或数组转换为一种规范化格式
 * 主要处理的是将形如"fieldName_label"的键拆分为fieldName和label，并保留其值
 * 如果键不包含下划线，则直接保留该键值对
 *
 * @param contentData 任意类型的参数，期望是对象或数组，但函数会处理null或非对象/数组的情况
 * @returns 返回转换后的数据结构，如果不是对象或数组则原样返回
 */
function restoreContentData(contentData: any): any {
  // 边界条件处理：如果内容为空或非对象/数组，直接返回
  if (contentData == null || typeof contentData !== 'object') {
    return contentData;
  }

  // 如果是数组，递归处理每个元素
  if (Array.isArray(contentData)) {
    return contentData.map((item) => restoreContentData(item));
  }

  // 如果是对象，遍历每个字段并递归处理
  const restoredContent: any = {};
  for (const key of Object.keys(contentData)) {
    // 针对包含下划线的键进行拆分处理
    if (key.includes('_')) {
      // 拆分键名和标签
      const parts = key.split('_');
      // 验证键的格式，确保至少包含一个下划线用于分隔
      if (parts.length < 2) {
        throw new Error(`Invalid key format: "${key}". Expected format: "fieldName_label".`);
      }
      const fieldName = parts[0];
      const label = parts.slice(1).join('_'); // 处理多个下划线的情况
      // 递归处理值，并构建新的键值对结构
      restoredContent[fieldName] = {
        label,
        value: restoreContentData(contentData[key]?.value) // 安全访问 value
      };
    } else {
      // 对于不包含下划线的键，直接保留并递归处理值
      restoredContent[key] = restoreContentData(contentData[key]);
    }
  }

  // 返回处理后的对象
  return restoredContent;
}

// 恢复数据的ID以及将AI生成后的内容重新赋值到原JSON上去
export const restoreDataId = (oldData: any, newData: any) => {
  oldData.componentsTree.forEach((item: any) => {
    const shortId = item.id.slice(-10); // 截取 id 的最后十位
    if (newData.hasOwnProperty(shortId)) {
      // 将原数据的多出属性合并到新数据中
      mergeData(item.dataSource, newData[shortId].moduleContent);
      // 将新数据完全赋值给原数据
      item.dataSource = newData[shortId].moduleContent;
    }
  });

  return oldData;
};

// 递归合并数据
function mergeData(oldData: any, newData: any) {
  for (const key in oldData) {
    if (oldData.hasOwnProperty(key)) {
      // 如果新数据中没有当前属性，则直接复制
      if (!newData.hasOwnProperty(key)) {
        newData[key] = oldData[key];
      } else {
        // 如果当前属性是对象，递归合并
        if (
          typeof oldData[key] === 'object' &&
          oldData[key] !== null &&
          !Array.isArray(oldData[key])
        ) {
          mergeData(oldData[key], newData[key]);
        }
        // 如果当前属性是数组
        else if (Array.isArray(oldData[key])) {
          // 检查数组元素是否是字符串
          const isStringArray = oldData[key].length > 0 && typeof oldData[key][0] === 'string';
          if (isStringArray) {
            // 如果是字符串数组，直接使用旧值
            newData[key] = oldData[key];
          } else {
            for (let i = 0; i < newData[key].length; i++) {
              if (oldData[key][i]) {
                mergeData(oldData[key][i], newData[key][i]);
              } else {
                // 代表新数据长度大于旧数据长度
                oldData[key][i] = cloneDeep(oldData[key][0]);
                mergeData(oldData[key][i], newData[key][i]);
              }
            }
            // // 如果是对象数组，递归合并每个元素
            // for (let i = 0; i < oldData[key].length; i++) {
            //   if (newData[key][i]) {
            //     mergeData(oldData[key][i], newData[key][i]);
            //   }
            // }
          }
        }
      }
    }
  }
}
