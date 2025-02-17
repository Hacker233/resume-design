import { cloneDeep } from 'lodash';
import modulesList from '../schema';
import { getUuid } from '@/utils/common';
import customCss from '../schema/customCss';

/**
 * @description 设置组件数据
 */
export const useSetModuleSchema = (data: any) => {
  const element = cloneDeep(data);
  element.id = getUuid();
  element.dataSource = {
    ...modulesList[element.category].dataSource,
    ...element.dataSource
  };
  element.css = {
    ...modulesList[element.category].css,
    ...element.css
  };
  console.log(JSON.stringify(modulesList[element.category].props));
  console.log(JSON.stringify(element.props));

  // 处理props
  const obj1 = { ...modulesList[element.category].props };
  const obj2 = { ...element.props };
  const result = { ...obj1 }; // 复制 obj1
  // 遍历 obj2，动态合并属性
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      result[key] = {
        ...(obj1[key] || {}), // 确保 obj1[key] 存在
        ...obj2[key] // 覆盖 obj1[key] 中的同名属性
      };
    }
  }

  element.props = result;

  element.customProps = {
    ...element.customProps,
    ...{
      showModule: true, // 是否展示模块
      unfoldModule: true // 是否展开模块
    }
  };
  // 添加模块标题的自定义样式
  if (element.customProps.hasOwnProperty('ModuleTitleCpt')) {
    const customCssKey: string = element.customProps.ModuleTitleCpt;
    const moduleTitleCustomCssArray = cloneDeep(customCss[customCssKey]);
    // 收集不在 element.customCss 中的元素
    const newItems: any[] = [];
    moduleTitleCustomCssArray.forEach((item2: any) => {
      const index = element.customCss.findIndex((item1: any) => item1.prop === item2.prop);
      if (index === -1) {
        newItems.push(cloneDeep(item2));
      } else {
        // 如果存在，替换 element.customCss 中的元素
        element.customCss[index] = cloneDeep(item2);
      }
    });
    // 将不在 element.customCss 中的元素整体插入到最前面
    element.customCss.unshift(...newItems);
  }
  return cloneDeep(element);
};
