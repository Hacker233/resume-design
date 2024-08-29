import { getUuid } from '@/utils/common';
import { IHJSchema } from '../types';

export const HJSchema: IHJSchema = {
  id: '',
  version: '1.0.0', // 当前JSON版本号
  componentsTree: [
    {
      id: getUuid(), // 组件唯一性id
      componentName: 'page', // 组件名
      commentType: 'page', // 组件类型
      oldPageIndex: '', // 旧的索引
      children: [
        {
          id: getUuid(),
          componentName: 'container', // 容器组件
          commentType: 'container', // 组件类型
          css: {
            width: 100,
            height: 300,
            rotate: 0, // 旋转角度
            backgroundColor: '#eee',
            padding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            },
            margin: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            },
            borderWidth: 3,
            borderRadius: 10,
            borderColor: '#eee',
            borderStyle: 'solid'
          },
          children: []
        }
      ]
    }
  ], // 描述组件/区块/模板的组件树
  i18n: {}, // 国际化语料库
  constants: {}, // 全局常量
  css: {
    width: 820,
    height: 1160,
    background: '#ffffff',
    opacity: 1,
    backgroundImage: '',
    fontFamily: '',
    themeColor: ''
  }, // 全局范围的css样式
  config: {
    title: '91化简' // 页面标题
  }, // 当前的页面的配置信息
  meta: {}, // 全局范围的元数据
  dataSource: {} // 全局范围的公共数据源
};
