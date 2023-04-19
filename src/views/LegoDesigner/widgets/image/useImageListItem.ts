import { IWidget } from '../../types';

/**
 * @description 返回图片对象
 */
export const useImageListItem = (imgItem: {
  title: any;
  imgUrl: any;
  width: any;
  height: any;
}): IWidget => {
  return {
    id: '', // 组件唯一性id
    componentName: 'hj-image', // 组件名
    commentType: '', // 组件类型
    icon: '', // 组件icon
    title: '', // 组件中文名称
    description: imgItem.title, // 组件描述信息
    screenShot: {
      src: '',
      width: '',
      height: '',
      borderRadius: ''
    }, // 组件快照
    keywords: '图片', // 组件关键词，用于搜索
    category: 'image', // 组件分类
    props: {}, // 组件属性
    css: {
      left: 0,
      top: 0,
      zIndex: 1,
      width: imgItem.width,
      height: imgItem.height,
      rotate: 0, // 旋转角度
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      borderWidth: 0,
      borderRadius: 10,
      borderColor: '#eee',
      backgroundColor: '#fff',
      borderStyle: 'solid'
    }, // 组件样式
    dataSource: {
      imgUrl: imgItem.imgUrl // 内容列表
    } // 组件单独数据
  };
};
