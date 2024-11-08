import customCss from '../../customCss';

export default {
  id: 'ProjectExperience_8', // 组件唯一性id
  componentName: 'ProjectExperience_8', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '项目经验', // 组件中文名称
  description: '项目经验模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'ProjectExperience_8.png'
  }, // 组件快照
  keywords: '项目经验', // 组件关键词，用于搜索
  category: 'project_experience', // 组件分类
  props: {
    title: {
      chName: '项目经验',
      show: true,
      iconfont: 'icon-xiangmu',
      config: true // 是否支持配置
    },
    contentTtile: {
      chName: '内容标题',
      show: false,
      iconfont: '',
      config: false // 是否支持配置
    }
  }, // 组件属性
  css: {
    themeColor: '#254665',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: {
      top: 13,
      right: 40,
      bottom: 20,
      left: 40
    }
  }, // 组件样式
  customCss: customCss['ProjectExperience_8'],
  dataSource: {}, // 组件单独数据
  customProps: {} // 自定义属性字段
};
