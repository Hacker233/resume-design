import { IWidget } from '../../types';

/**
 * @description 返回图标对象
 */
export const useLiListItem = (iconItem: {
  listStyleType?: any;
  description: any;
  listStyleImage?: any;
}): IWidget => {
  return {
    id: '', // 组件唯一性id
    componentName: 'hj-li', // 组件名
    commentType: '', // 组件类型
    icon: '', // 组件icon
    title: '', // 组件中文名称
    description: iconItem.description, // 组件描述信息
    screenShot: {
      src: '',
      width: '',
      height: '',
      borderRadius: ''
    }, // 组件快照
    keywords: '头像', // 组件关键词，用于搜索
    category: 'li', // 组件分类
    props: {
      listStyleType: iconItem.listStyleType,
      listStyleImage: iconItem.listStyleImage
    }, // 组件属性
    css: {
      left: 0,
      top: 0,
      zIndex: 1,
      width: 80,
      height: 40,
      rotate: 0, // 旋转角度
      fontSize: 14,
      lineHeight: 1.5,
      fontFamily: '方正黑体简体',
      fontColor: '#333333',
      fontWeight: 500,
      textAlign: 'justify',
      markerPosition: 'inside',
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 3
      },
      borderWidth: 0,
      borderRadius: 10,
      borderColor: '#eee',
      backgroundColor: '#fff',
      borderStyle: 'solid'
    }, // 组件样式
    dataSource: {
      liList: ['91化简', '91化简'] // 内容列表
    } // 组件单独数据
  };
};
