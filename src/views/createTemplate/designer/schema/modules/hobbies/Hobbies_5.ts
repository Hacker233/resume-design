import customCss from '../../customCss';

export default {
  id: 'Hobbies_5', // 组件唯一性id
  componentName: 'Hobbies_5', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '兴趣爱好', // 组件中文名称
  description: '兴趣爱好模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'Hobbies_5.png'
  }, // 组件快照
  keywords: '兴趣爱好', // 组件关键词，用于搜索
  category: 'hobbies', // 组件分类
  props: {
    title: {
      chName: '兴趣爱好',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    }
  }, // 组件属性
  css: {
    position: 'relative',
    themeColor: '#da180f',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: {
      top: 0,
      right: 30,
      bottom: 45,
      left: 25
    }
  }, // 组件样式
  customCss: customCss['Hobbies_5'],
  dataSource: {}, // 组件单独数据
  ustomProps: {
    ModuleTitleCpt: 'ModuleTitle_6'
  } // 自定义属性字段
};
