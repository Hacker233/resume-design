import customCss from '../../customCss';

export default {
  id: 'EduBackground_4', // 组件唯一性id
  componentName: 'EduBackground_4', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '教育背景', // 组件中文名称
  description: '教育背景模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'EduBackground_4.png'
  }, // 组件快照
  keywords: '教育背景', // 组件关键词，用于搜索
  category: 'edu_background', // 组件分类
  props: {}, // 组件属性
  css: {
    position: 'relative',
    themeColor: '#079cfa',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: {
      top: 0,
      right: 30,
      bottom: 20,
      left: 25
    }
  }, // 组件样式
  customCss: customCss['EduBackground_4'],
  dataSource: {}, // 组件单独数据
  customProps: {} // 自定义属性字段
};
