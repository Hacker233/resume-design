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
        componentName: 'hj-avatar-1', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '正方形头像', // 组件描述信息
        screenShot: {
          src: 'screenShot.png',
          width: '70px',
          height: '90px'
        }, // 组件快照
        keywords: '头像', // 组件关键词，用于搜索
        category: 'avatar', // 组件分类
        props: {}, // 组件属性
        css: {
          width: 120,
          height: 150,
          fontSize: '',
          fontFamily: '',
          fontWeight: '',
          color: '',
          backgroundColor: '#eee',
          marginTop: '',
          marginRight: '',
          marginBottom: '',
          marginLeft: '',
          paddingTop: '',
          paddingRight: '',
          paddingBottom: '',
          paddingLeft: '',
          borderRadius: '10px',
          borderWidth: '3px',
          borderColor: '#eee',
          boderStyle: 'solid',
          zIndex: 0
        }, // 组件样式
        location: {
          x: 0,
          y: 0
        }, // 组件位置信息
        dataSource: {} // 组件单独数据
      }
    ]
  }
];
