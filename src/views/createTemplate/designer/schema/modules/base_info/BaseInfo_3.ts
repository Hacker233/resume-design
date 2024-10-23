import customCss from '../../customCss';

export default {
  id: 'BaseInfo_3', // 组件唯一性id
  componentName: 'BaseInfo_3', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '基本资料', // 组件中文名称
  description: '基础信息模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'BaseInfo_3.png'
  }, // 组件快照
  keywords: '基础信息', // 组件关键词，用于搜索
  category: 'base_info', // 组件分类
  props: {
    degree: {
      chName: '学历',
      show: false
    }
  }, // 组件属性
  css: {
    themeColor: '#254665',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: {
      top: 10,
      right: 25,
      bottom: 20,
      left: 25
    }
  }, // 组件样式
  customCss: customCss['BaseInfo_3'],
  dataSource: {}, // 组件单独数据
  customProps: {} // 自定义属性字段
};
