import customCss from '../../customCss';

export default {
  id: 'SelfEvaluation_4', // 组件唯一性id
  componentName: 'SelfEvaluation_4', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '自我评价', // 组件中文名称
  description: '自我评价模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'SelfEvaluation_4.png'
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
    position: 'relative',
    themeColor: '#079cfa',
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
  customCss: customCss['SelfEvaluation_4'],
  dataSource: {}, // 组件单独数据
  ustomProps: {
    ModuleTitleCpt: 'ModuleTitle_1'
  } // 自定义属性字段
};
