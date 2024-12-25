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
  element.props = {
    ...modulesList[element.category].props,
    ...element.props
  };

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
