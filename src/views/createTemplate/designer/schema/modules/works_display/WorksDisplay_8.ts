import customCss from '../../customCss';

export default {
  id: 'WorksDisplay_8', // 组件唯一性id
  componentName: 'WorksDisplay_8', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '作品展示', // 组件中文名称
  description: '作品展示模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'WorksDisplay_8.png'
  }, // 组件快照
  keywords: '作品展示', // 组件关键词，用于搜索
  category: 'works_display', // 组件分类
  props: {
    title: {
      chName: '作品展示',
      show: true,
      iconfont: 'icon-zhuanyezhishijineng',
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
  customCss: customCss['WorksDisplay_8'],
  dataSource: {}, // 组件单独数据
  customProps: {} // 自定义属性字段
};
