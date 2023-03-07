interface IHJSchema {
  version: string; // 当前JSON版本号
  componentsTree: Array<any>; // 描述组件/区块/模板的组件树
  i18n: any; // 国际化语料库
  constants: any; // 全局常量
  css: {
    width: string;
    height: string;
    background: string;
    themeColor: string;
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
  }; // 全局范围的css样式
  config: {
    title: string; // 页面标题
  }; // 当前的页面的配置信息
  meta: any; // 全局范围的元数据
  dataSource: any; // 全局范围的公共数据源
}
export { IHJSchema };
