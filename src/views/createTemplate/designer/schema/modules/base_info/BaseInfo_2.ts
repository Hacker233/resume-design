import customCss from '../../customCss';

export default {
  id: 'BaseInfo_2', // 组件唯一性id
  componentName: 'BaseInfo_2', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '基本信息_2', // 组件中文名称
  description: '基本信息模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'BaseInfo_2.png'
  }, // 组件快照
  keywords: '基础信息', // 组件关键词，用于搜索
  category: 'base_info', // 组件分类
  props: {}, // 组件属性
  css: {
    backgroundPath: 'baseInfo_2.png', // 背景图片地址
    backgroundRepeat: 'no-repeat',
    alignItems: 'flex-start',
    height: 250,
    padding: {
      top: 40,
      right: 45,
      bottom: 0,
      left: 45
    }
  }, // 组件样式
  customCss: customCss['BaseInfo_2'],
  dataSource: {}, // 组件单独数据
  customProps: {} // 自定义属性字段
};
