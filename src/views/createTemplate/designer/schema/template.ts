import { IHJNewSchema } from '../../types/IHJNewSchema';

export const HJNewSchema: IHJNewSchema = {
  id: '',
  version: '1.0.0', // 当前JSON版本号
  componentsTree: [], // 描述组件/区块/模板的组件树
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
