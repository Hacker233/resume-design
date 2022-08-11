interface IDESIGNJSON {
  ID: string; // 模板Id
  NAME: string;
  TITLE: string;
  components: Array<any>; // 模板内组件列表
  GLOBAL_STYLE: {
    themeColor: string; // 主题色
    firstTitleFontSize: string; // 一级标题
    secondTitleFontSize: string; // 二级标题
    textFontSize: string; // 正文
    secondTitleColor: string; // 二级标题字体颜色
    textFontColor: string; // 正文字体颜色
    secondTitleWeight: number; // 二级标题字体粗细
    textFontWeight: number; // 正文字体粗细
    modelMarginTop: string;
    modelMarginBottom: string;
  };
}
export default IDESIGNJSON;
