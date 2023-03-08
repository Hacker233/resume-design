import { IHJSchema } from '../types';

export const HJSchema: IHJSchema = {
  version: '', // 当前JSON版本号
  componentsTree: [], // 描述组件/区块/模板的组件树
  i18n: {}, // 国际化语料库
  constants: {}, // 全局常量
  css: {
    width: '820px',
    height: '1160px',
    background: '#fff',
    themeColor: '',
    paddingTop: '',
    paddingRight: '',
    paddingBottom: '',
    paddingLeft: ''
  }, // 全局范围的css样式
  config: {
    title: '' // 页面标题
  }, // 当前的页面的配置信息
  meta: {}, // 全局范围的元数据
  dataSource: {} // 全局范围的公共数据源
};
