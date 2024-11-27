import customCss from '../../customCss';

export default {
  id: 'BaseInfo_4', // 组件唯一性id
  componentName: 'BaseInfo_4', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '基本资料', // 组件中文名称
  description: '基本信息模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'BaseInfo_4.png'
  }, // 组件快照
  keywords: '基础信息', // 组件关键词，用于搜索
  category: 'base_info', // 组件分类
  props: {}, // 组件属性
  css: {
    themeColor: 'red',
    alignItems: 'center',
    height: 200,
    padding: {
      top: 10,
      right: 30,
      bottom: 0,
      left: 30
    }
  }, // 组件样式
  customCss: customCss['BaseInfo_4'],
  dataSource: {}, // 组件单独数据
  customProps: {} // 自定义属性字段
};
