import customCss from '../../customCss';

export default {
  id: 'BaseInfo_8', // 组件唯一性id
  componentName: 'BaseInfo_8', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '基本资料', // 组件中文名称
  description: '基本信息模块', // 组件描述信息
  screenShot: {
    width: '47%',
    url: '',
    name: 'BaseInfo_8.png'
  }, // 组件快照
  keywords: '基础信息', // 组件关键词，用于搜索
  category: 'base_info', // 组件分类
  props: {
    moduleTitleIcon: 'icon-jibenziliao' // 模块标题图标
  }, // 组件属性
  css: {
    width: '100%',
    height: 385,
    display: 'flex',
    flexDirection: 'column',
    background: 'none',
    padding: {
      top: 30,
      right: 0,
      bottom: 0,
      left: 0
    }
  }, // 组件样式
  customCss: customCss['BaseInfo_8'],
  dataSource: {}, // 组件单独数据
  customProps: {
    // 不需要展示数据配置项
    dataSourceNotShow: {
      name: true,
      abstract: true,
      avatar: true
    }
  } // 自定义属性字段
};
