import { IWidget } from '../../types';

/**
 * @description 返回图标对象
 */
export const useIconfontItem = (iconItem: {
  icon_id?: string;
  name: any;
  font_class: any;
  unicode?: string;
  unicode_decimal?: number;
}): IWidget => {
  return {
    id: '', // 组件唯一性id
    componentName: 'hj-icon', // 组件名
    commentType: '', // 组件类型
    icon: 'icon-' + iconItem.font_class, // 组件icon
    title: '', // 组件中文名称
    description: iconItem.name, // 组件描述信息
    screenShot: {
      src: '',
      width: '',
      height: '',
      borderRadius: ''
    }, // 组件快照
    keywords: iconItem.name, // 组件关键词，用于搜索
    category: 'icon', // 组件分类
    props: {
      icon: 'icon-' + iconItem.font_class
    }, // 组件属性
    css: {
      left: 0,
      top: 0,
      zIndex: 1,
      width: 40,
      height: 40,
      rotate: 0, // 旋转角度
      iconSize: 25,
      textAlign: 'center',
      iconColor: '#74a274',
      backgroundColor: '#ffffff',
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
  };
};
