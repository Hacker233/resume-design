// 模板设置的JSON数据格式
export const DESIGN_JSON = {
  ID: '', // 模板Id
  NAME: '',
  TITLE: '',
  components: [], // 模板内组件列表
  GLOBAL_STYLE: {
    themeColor: '#079cfa', // 主题色
    firstTitleFontSize: '20px', // 一级标题
    secondTitleFontSize: '14px', // 二级标题
    textFontSize: '14px', // 正文
    secondTitleColor: '#666', // 二级标题字体颜色
    textFontColor: '#757575', // 正文字体颜色
    secondTitleWeight: 600, // 二级标题字体粗细
    textFontWeight: 500, // 正文字体粗细
    modelMarginTop: '0px',
    modelMarginBottom: '45px'
  }
};

// 组件列表
export const MATERIAL_JSON = {
  TEST_BOX: {
    keyId: '', // 组件id
    cptName: 'TEST_BOX', // 组件名
    cptTitle: '', // 组件名
    cptX: 0, // 组件x坐标
    cptY: 0, // 组件y坐标
    cptZ: 0, // 组件z坐标
    cptHeight: '', // 组件高度
    cptWidth: '', // 组件宽度
    style: {}, // 组件样式
    data: {} // 组件数据
  }
};
