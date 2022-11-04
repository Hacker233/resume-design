import IRESUMEJSON from '@/interface/resume';

// 简历模板数据
const RESUME_JSON: IRESUMEJSON = {
  ID: '', // 模板Id
  NAME: '',
  TITLE: '模板标题',
  LAYOUT: 'classical', // 布局模式
  COMPONENTS: [], // 模板内组件列表
  GLOBAL_STYLE: {
    themeColor: '#079cfa', // 主题色
    firstTitleFontSize: '20px', // 一级标题
    secondTitleFontSize: '14px', // 二级标题
    textFontSize: '14px', // 正文
    secondTitleColor: '#666', // 二级标题字体颜色
    textFontColor: '#757575', // 正文字体颜色
    secondTitleWeight: 600, // 二级标题字体粗细
    textFontWeight: 500, // 正文字体粗细
    pTopBottom: '0', // 上下内边距
    pLeftRight: '', // 左右内边距
    modelMarginTop: '0px',
    modelMarginBottom: '45px',
    leftWidth: '', // 左右布局时左侧宽度
    rightWidth: '', // 左右布局时右侧宽度
    leftThemeColor: '', // 左侧布局时左侧背景色
    rightThemeColor: '', // 右侧布局时右侧背景色
    resumeBackgroundCom: ''
  }
};
export default RESUME_JSON;
