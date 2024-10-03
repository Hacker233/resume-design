import { IHJNewSchema } from '../../types/IHJNewSchema';

export const HJNewSchema: IHJNewSchema = {
  id: '',
  version: '1.0.0', // 当前JSON版本号
  componentsTree: [
    {
      id: 'ResumeTitle_1', // 组件唯一性id
      componentName: 'ResumeTitle_1', // 组件名
      commentType: '', // 组件类型
      icon: '', // 组件icon
      title: '简历标题_1', // 组件中文名称
      description: '简历标题模块', // 组件描述信息
      screenShot: {}, // 组件快照
      keywords: '简历标题', // 组件关键词，用于搜索
      category: 'resume_title', // 组件分类
      props: {}, // 组件属性
      css: {
        height: 32,
        background: '#000',
        color: '#fff'
      }, // 组件样式
      dataSource: {}, // 组件单独数据
      customProps: {} // 自定义属性字段
    },
    {
      id: 'ResumeTitle_2', // 组件唯一性id
      componentName: 'ResumeTitle_2', // 组件名
      commentType: '', // 组件类型
      icon: '', // 组件icon
      title: '简历标题_2', // 组件中文名称
      description: '简历标题模块', // 组件描述信息
      screenShot: {}, // 组件快照
      keywords: '简历标题', // 组件关键词，用于搜索
      category: 'resume_title', // 组件分类
      props: {}, // 组件属性
      css: {
        height: 32,
        background: '#000',
        color: '#fff'
      }, // 组件样式
      dataSource: {}, // 组件单独数据
      customProps: {} // 自定义属性字段
    }
  ], // 描述组件/区块/模板的组件树
  i18n: {}, // 国际化语料库
  constants: {}, // 全局常量
  props: {
    pageName: ''
  },
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
