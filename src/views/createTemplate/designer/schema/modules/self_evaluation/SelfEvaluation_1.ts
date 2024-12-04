import customCss from '../../customCss';

export default {
  id: 'SelfEvaluation_1', // 组件唯一性id
  componentName: 'SelfEvaluation_1', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '自我评价', // 组件中文名称
  description: '自我评价模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'SelfEvaluation_1.png'
  }, // 组件快照
  keywords: '自我评价', // 组件关键词，用于搜索
  category: 'self_evaluation', // 组件分类
  props: {}, // 组件属性
  css: {
    themeColor: '#254665',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: {
      top: 0,
      right: 40,
      bottom: 20,
      left: 40
    }
  }, // 组件样式
  customCss: customCss['SelfEvaluation_1'],
  dataSource: {}, // 组件单独数据
  customProps: {
    ModuleTitleCpt: 'ModuleTitle_3'
  } // 自定义属性字段
};
