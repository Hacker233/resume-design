import customCss from '../../customCss';

export default {
  id: 'SelfEvaluation_8', // 组件唯一性id
  componentName: 'SelfEvaluation_8', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '自我评价', // 组件中文名称
  description: '自我评价模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'SelfEvaluation_8.png'
  }, // 组件快照
  keywords: '自我评价', // 组件关键词，用于搜索
  category: 'self_evaluation', // 组件分类
  props: {
    title: {
      chName: '自我评价',
      show: true,
      iconfont: 'icon-ziwopingjia',
      config: true // 是否支持配置
    }
  }, // 组件属性
  css: {
    themeColor: '#254665',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: {
      top: 13,
      right: 40,
      bottom: 35,
      left: 40
    }
  }, // 组件样式
  customCss: customCss['SelfEvaluation_8'],
  dataSource: {}, // 组件单独数据
  customProps: {
    ModuleTitleCpt: 'ModuleTitle_9'
  } // 自定义属性字段
};
