import customCss from '../../customCss';

export default {
  id: 'ResumeTitle_1', // 组件唯一性id
  componentName: 'ResumeTitle_1', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '简历标题_1', // 组件中文名称
  description: '简历标题模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'ResumeTitle_1.png'
  }, // 组件快照
  keywords: '简历标题', // 组件关键词，用于搜索
  category: 'resume_title', // 组件分类
  props: {}, // 组件属性
  css: {
    height: 32,
    background: '#000',
    color: '#fff',
    margin: {
      bottom: 10,
      left: 0,
      right: 0,
      top: 10
    }
  }, // 组件样式
  customCss: customCss['ResumeTitle_1'],
  dataSource: {}, // 组件单独数据
  customProps: {} // 自定义属性字段
};
