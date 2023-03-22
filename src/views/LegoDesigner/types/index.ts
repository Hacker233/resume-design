// 页面JSON格式
interface IHJSchema {
  version: string; // 当前JSON版本号
  componentsTree: Array<any>; // 描述组件/区块/模板的组件树
  i18n: any; // 国际化语料库
  constants: any; // 全局常量
  css: {
    width: number;
    height: number;
    backgroundColor: string;
    themeColor: string;
  }; // 全局范围的css样式
  config: {
    title: string; // 页面标题
  }; // 当前的页面的配置信息
  meta: any; // 全局范围的元数据
  dataSource: any; // 全局范围的公共数据源
}

// 组件JSON格式
interface IWidget {
  id: string; // 组件唯一性id
  componentName: string; // 组件名
  commentType: ''; // 组件类型
  icon: string; // 组件icon
  title: string; // 组件中文名称
  description: string; // 组件描述信息
  screenShot: {
    src: string;
    width: string;
    height: string;
  }; // 组件快照
  keywords: string; // 组件关键词，用于搜索
  category: string; // 组件分类
  props: any; // 组件属性
  css: any; // 组件样式
  dataSource: any; // 组件单独数据
}

// 某一个组件分类格式
interface IWidgetTab {
  title: string;
  category: string;
  dataSource: any; // 该分类下公用数据源
  list: Array<IWidget>;
}
export { IHJSchema, IWidget, IWidgetTab };
