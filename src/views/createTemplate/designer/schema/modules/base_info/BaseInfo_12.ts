import customCss from '../../customCss';

export default {
  id: 'BaseInfo_12', // 组件唯一性id
  componentName: 'BaseInfo_12', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '基本资料', // 组件中文名称
  description: '基本信息模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'BaseInfo_12.png'
  }, // 组件快照
  keywords: '基础信息', // 组件关键词，用于搜索
  category: 'base_info', // 组件分类
  props: {}, // 组件属性
  css: {
    themeColor: '#048bb3',
    alignItems: 'center',
    height: 220,
    display: 'flex',
    flexDirection: 'column',
    padding: {
      top: 10,
      right: 15,
      bottom: 0,
      left: 15
    }
  }, // 组件样式
  customCss: customCss['BaseInfo_12'],
  dataSource: {}, // 组件单独数据
  customProps: {} // 自定义属性字段
};
