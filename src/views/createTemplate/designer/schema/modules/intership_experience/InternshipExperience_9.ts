import customCss from '../../customCss';

export default {
  id: 'InternshipExperience_9', // 组件唯一性id
  componentName: 'InternshipExperience_9', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '实习经验', // 组件中文名称
  description: '实习经验模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'InternshipExperience_9.png'
  }, // 组件快照
  keywords: '基础信息', // 组件关键词，用于搜索
  category: 'internship_experience', // 组件分类
  props: {
    title: {
      chName: '实习经验',
      show: true,
      iconfont: 'icon-biyeshixi',
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
  customCss: customCss['InternshipExperience_9'],
  dataSource: {}, // 组件单独数据
  customProps: {} // 自定义属性字段
};
