import { IWidgetTab } from '../types';

export const WIDGET_CONFIG_LIST: Array<IWidgetTab> = [
  {
    title: '头像',
    category: 'avatar',
    dataSource: {
      src: '' // 默认头像地址
    }, // 该分类下公用数据源
    list: [
      {
        id: '', // 组件唯一性id
        componentName: 'avatar-1', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '正方形头像', // 组件描述信息
        screenShot: {
          src: '',
          width: '80px',
          height: '80px'
        }, // 组件快照
        keywords: '头像', // 组件关键词，用于搜索
        category: 'avatar', // 组件分类
        props: {}, // 组件属性
        css: {
          width: '',
          height: '',
          fontSize: '',
          fontFamily: '',
          fontWeight: '',
          color: '',
          backgroundColor: 'green',
          marginTop: '',
          marginRight: '',
          marginBottom: '',
          marginLeft: '',
          paddingTop: '',
          paddingRight: '',
          paddingBottom: '',
          paddingLeft: ''
        }, // 组件样式
        location: {
          x: '',
          y: '',
          w: '',
          h: ''
        }, // 组件位置信息
        dataSource: {} // 组件单独数据
      }
    ]
  }
];
