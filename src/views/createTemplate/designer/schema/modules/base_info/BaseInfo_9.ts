import customCss from '../../customCss';

export default {
  id: 'BaseInfo_9', // 组件唯一性id
  componentName: 'BaseInfo_9', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '基本资料', // 组件中文名称
  description: '基本信息模块', // 组件描述信息
  screenShot: {
    width: '47%',
    url: '',
    name: 'BaseInfo_9.png'
  }, // 组件快照
  keywords: '基础信息', // 组件关键词，用于搜索
  category: 'base_info', // 组件分类
  props: {
    title: {
      chName: '模块标题',
      show: true,
      iconfont: 'icon-jibenziliao',
      config: true
    },
    abstract: {
      chName: '一句话简介',
      show: true,
      iconfont: '',
      config: false // 是否支持配置
    }, // 简介
    avatar: {
      chName: '证件照',
      show: true,
      iconfont: '',
      config: false // 是否支持配置
    }, // 头像地址
    name: {
      chName: '姓名',
      show: true,
      iconfont: '',
      config: false // 是否支持配置
    }
  }, // 组件属性
  css: {
    width: '100%',
    height: 285,
    display: 'flex',
    flexDirection: 'column',
    background: 'none',
    padding: {
      top: 30,
      right: 40,
      bottom: 0,
      left: 40
    }
  }, // 组件样式
  customCss: customCss['BaseInfo_9'],
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
