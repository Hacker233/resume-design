export const HJSchema = {
  version: '', // 当前JSON版本号
  componentsTree: [
    {
      componentName: '', // 组件name，用户渲染组件
      commentType: '', // 组件类型
      props: {}, // 组件属性
      css: {
        width: '',
        height: '',
        fontSize: '',
        fontFamily: '',
        fontWeight: '',
        color: '',
        backgroundColor: '',
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
  ], // 描述组件/区块/模板的组件树
  i18n: {}, // 国际化语料库
  constants: {}, // 全局常量
  css: {
    width: '',
    height: '',
    background: '',
    themeColor: '',
    paddingTop: '',
    paddingRight: '',
    paddingBottom: '',
    paddingLeft: ''
  }, // 全局范围的css样式
  config: {
    title: '' // 页面标题
  }, // 当前的页面的配置信息
  meta: {}, // 全局范围的元数据
  dataSource: {} // 全局范围的公共数据源
};
