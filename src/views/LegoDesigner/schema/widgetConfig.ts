import { IWidgetTab } from '../types';

export const WIDGET_CONFIG_LIST: Array<IWidgetTab> = [
  {
    title: '头像',
    category: 'avatar',
    dataSource: {
      avatarSrc: '' // 默认头像地址
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
          left: 0,
          top: 0,
          zIndex: 1,
          width: 120,
          height: 150,
          rotate: 0, // 旋转角度
          backgroundColor: '#eee',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 3,
          borderRadius: 10,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      }
    ]
  },
  {
    title: '文本',
    category: 'text',
    dataSource: {
      text: '91化简，就是要简单！' // 文本内容
    }, // 该分类下公用数据源
    list: [
      {
        id: '', // 组件唯一性id
        componentName: 'hj-text-1', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '正方形头像', // 组件描述信息
        screenShot: {
          src: 'text-1.png',
          width: '125px',
          height: '28px'
        }, // 组件快照
        keywords: '文本-1', // 组件关键词，用于搜索
        category: 'avatar', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 165,
          height: 20,
          rotate: 0, // 旋转角度
          fontSize: 14,
          lineHeight: 1.5,
          fontFamily: '方正黑体简体',
          fontWeight: 500,
          textAlign: 'justify',
          fontColor: '#333333',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 10,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      }
    ]
  }
];
