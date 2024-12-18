import customCss from '../../customCss';

export default {
  id: 'ResumeTitle_3', // 组件唯一性id
  componentName: 'ResumeTitle_3', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '简历标题', // 组件中文名称
  description: '简历标题模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'ResumeTitle_3.png'
  }, // 组件快照
  keywords: '简历标题', // 组件关键词，用于搜索
  category: 'resume_title', // 组件分类
  props: {}, // 组件属性
  css: {
    themeColor: '#5974D4',
    height: 54,
    background: '#5974D4',
    color: '#7a90dd',
    fontSize: 40,
    fontWeight: 600,
    letterSpacing: 2,
    margin: {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0
    },
    padding: {
      bottom: 0,
      left: 30,
      right: 30,
      top: 0
    }
  }, // 组件样式
  customCss: customCss['ResumeTitle_3'],
  dataSource: {
    title: {
      type: 'input',
      label: '简历标题',
      value: 'PERSONAL RESUME',
      props: {
        width: '100%'
      }
    }
  }, // 组件单独数据
  customProps: {} // 自定义属性字段
};
