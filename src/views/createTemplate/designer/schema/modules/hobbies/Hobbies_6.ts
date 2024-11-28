import customCss from '../../customCss';

export default {
  id: 'Hobbies_6', // 组件唯一性id
  componentName: 'Hobbies_6', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '兴趣爱好', // 组件中文名称
  description: '兴趣爱好模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'Hobbies_6.png'
  }, // 组件快照
  keywords: '兴趣爱好', // 组件关键词，用于搜索
  category: 'hobbies', // 组件分类
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
  customCss: customCss['Hobbies_6'],
  dataSource: {}, // 组件单独数据
  ustomProps: {
    ModuleTitleCpt: 'ModuleTitle_7'
  } // 自定义属性字段
};
