import IDESIGNJSON from '@/interface/design';
import { IMSTERIALLISTJSON } from '@/interface/material';

// 模板设置的JSON数据格式
export const DESIGN_JSON: IDESIGNJSON = {
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
    pLeftRight: '40px', // 左右内边距
    modelMarginTop: '0px',
    modelMarginBottom: '45px',
    leftWidth: '', // 左右布局时左侧宽度
    rightWidth: '', // 左右布局时右侧宽度
    leftThemeColor: '', // 左侧布局时左侧背景色
    rightThemeColor: '' // 右侧布局时右侧背景色
  }
};

// 组件列表
export const MATERIAL_JSON: IMSTERIALLISTJSON = {
  RESUME_TITLE: [
    {
      keyId: '', // 组件id
      model: 'RESUME_TITLE', // 模块
      cptName: 'RESUME_TITLE_1', // 组件名
      cptOptionsName: 'RESUME_TITLE_OPTIONS',
      cptTitle: '简历标题', // 组件名
      cptX: 0, // 组件x坐标
      cptY: 0, // 组件y坐标
      cptZ: 0, // 组件z坐标
      cptHeight: '100px', // 组件高度
      cptWidth: '100%', // 组件宽度
      layout: '', // 布局在左侧还是右侧
      style: {
        themeColor: '#000', // 主题色
        firstTitleFontSize: '20px', // 一级标题
        titleColor: '#121c26',
        titleFontSize: '30px',
        titleFontWeight: 500,
        textColor: '#fff',
        textFontSize: '16px',
        textFontWeight: 600,
        backgroundColor: '#000',
        mBottom: '35px',
        mTop: '15px',
        pTopBottom: '0', // 上下内边距
        pLeftRight: '0' // 左右内边距
      }, // 组件样式
      data: {} // 组件数据
    }
  ],
  BASE_INFO: [
    {
      keyId: '', // 组件id
      model: 'BASE_INFO', // 模块
      cptName: 'BASE_INFO_1', // 组件名
      cptOptionsName: 'BASE_INFO_OPTIONS',
      cptTitle: '基础资料', // 组件名
      cptX: 0, // 组件x坐标
      cptY: 0, // 组件y坐标
      cptZ: 0, // 组件z坐标
      cptHeight: '100px', // 组件高度
      cptWidth: '100%', // 组件宽度
      layout: '', // 布局在左侧还是右侧
      style: {
        themeColor: '#000', // 主题色
        firstTitleFontSize: '20px', // 一级标题
        titleColor: '#121c26',
        titleFontSize: '30px',
        textFontSize: '14px',
        titleFontWeight: 500,
        textFontWeight: 500,
        textColor: '#7c7b7b',
        backgroundColor: '',
        mBottom: '50px',
        mTop: '0px',
        pTopBottom: '0', // 上下内边距
        pLeftRight: '40px' // 左右内边距
      }, // 组件样式
      data: {} // 组件数据
    }
  ],
  JOB_INTENTION: [
    {
      keyId: '', // 组件id
      model: 'JOB_INTENTION', // 模块
      cptName: 'JOB_INTENTION_1', // 组件名
      cptOptionsName: 'JOB_INTENTION_OPTIONS',
      cptTitle: '求职意向', // 组件名
      cptX: 0, // 组件x坐标
      cptY: 0, // 组件y坐标
      cptZ: 0, // 组件z坐标
      cptHeight: '100px', // 组件高度
      cptWidth: '100%', // 组件宽度
      layout: '', // 布局在左侧还是右侧
      style: {
        themeColor: '#000', // 主题色
        firstTitleFontSize: '20px', // 一级标题
        titleColor: '#121c26',
        titleFontSize: '30px',
        titleFontWeight: 500,
        textColor: '#757575',
        textFontSize: '14px',
        textFontWeight: 500,
        backgroundColor: '',
        mBottom: '35px',
        mTop: '0px',
        pTopBottom: '0', // 上下内边距
        pLeftRight: '40px' // 左右内边距
      }, // 组件样式
      data: {} // 组件数据
    }
  ],
  EDU_BACKGROUND: [
    {
      keyId: '', // 组件id
      model: 'EDU_BACKGROUND', // 模块
      cptName: 'EDU_BACKGROUND_1', // 组件名
      cptOptionsName: 'EDU_BACKGROUND_OPTIONS',
      cptTitle: '教育背景', // 组件名
      cptX: 0, // 组件x坐标
      cptY: 0, // 组件y坐标
      cptZ: 0, // 组件z坐标
      cptHeight: '50px', // 组件高度
      cptWidth: '100%', // 组件宽度
      layout: '', // 布局在左侧还是右侧
      style: {
        themeColor: '#000', // 主题色
        firstTitleFontSize: '20px', // 一级标题
        textColor: '#757575', // 正文
        textFontSize: '14px',
        textFontWeight: 500,
        titleColor: '#666666', // 二级标题
        titleFontSize: '14px',
        titleFontWeight: 600,
        backgroundColor: '#000',
        mBottom: '35px',
        mTop: '0px',
        pTopBottom: '0', // 上下内边距
        pLeftRight: '40px' // 左右内边距
      }, // 组件样式
      data: {} // 组件数据
    }
  ],
  SKILL_SPECIALTIES: [
    {
      keyId: '', // 组件id
      model: 'SKILL_SPECIALTIES', // 模块
      cptName: 'SKILL_SPECIALTIES_1', // 组件名
      cptOptionsName: 'SKILL_SPECIALTIES_OPTIONS',
      cptTitle: '技能特长', // 组件名
      cptX: 0, // 组件x坐标
      cptY: 0, // 组件y坐标
      cptZ: 0, // 组件z坐标
      cptHeight: '50px', // 组件高度
      cptWidth: '100%', // 组件宽度
      layout: '', // 布局在左侧还是右侧
      style: {
        themeColor: '#000', // 主题色
        firstTitleFontSize: '20px', // 一级标题
        textColor: '#757575', // 正文
        textFontSize: '14px',
        textFontWeight: 500,
        titleColor: '#666666', // 二级标题
        titleFontSize: '14px',
        titleFontWeight: 600,
        backgroundColor: '#000',
        mBottom: '35px',
        mTop: '0px',
        pTopBottom: '0', // 上下内边距
        pLeftRight: '40px' // 左右内边距
      }, // 组件样式
      data: {} // 组件数据
    }
  ],
  CAMPUS_EXPERIENCE: [
    {
      keyId: '', // 组件id
      model: 'CAMPUS_EXPERIENCE', // 模块
      cptName: 'CAMPUS_EXPERIENCE_1', // 组件名
      cptOptionsName: 'CAMPUS_EXPERIENCE_OPTIONS',
      cptTitle: '校园经历', // 组件名
      cptX: 0, // 组件x坐标
      cptY: 0, // 组件y坐标
      cptZ: 0, // 组件z坐标
      cptHeight: '50px', // 组件高度
      cptWidth: '100%', // 组件宽度
      layout: '', // 布局在左侧还是右侧
      style: {
        themeColor: '#000', // 主题色
        firstTitleFontSize: '20px', // 一级标题
        textColor: '#757575', // 正文
        textFontSize: '14px',
        textFontWeight: 500,
        titleColor: '#666666', // 二级标题
        titleFontSize: '14px',
        titleFontWeight: 600,
        backgroundColor: '#000',
        mBottom: '35px',
        mTop: '0px',
        pTopBottom: '0', // 上下内边距
        pLeftRight: '40px' // 左右内边距
      }, // 组件样式
      data: {} // 组件数据
    }
  ],
  INTERNSHIP_EXPERIENCE: [
    {
      keyId: '', // 组件id
      model: 'INTERNSHIP_EXPERIENCE', // 模块
      cptName: 'INTERNSHIP_EXPERIENCE_1', // 组件名
      cptOptionsName: 'INTERNSHIP_EXPERIENCE_OPTIONS',
      cptTitle: '实习经验', // 组件名
      cptX: 0, // 组件x坐标
      cptY: 0, // 组件y坐标
      cptZ: 0, // 组件z坐标
      cptHeight: '50px', // 组件高度
      cptWidth: '100%', // 组件宽度
      layout: '', // 布局在左侧还是右侧
      style: {
        themeColor: '#000', // 主题色
        firstTitleFontSize: '20px', // 一级标题
        textColor: '#757575', // 正文
        textFontSize: '14px',
        textFontWeight: 500,
        titleColor: '#666666', // 二级标题
        titleFontSize: '14px',
        titleFontWeight: 600,
        backgroundColor: '#000',
        mBottom: '35px',
        mTop: '0px',
        pTopBottom: '0', // 上下内边距
        pLeftRight: '40px' // 左右内边距
      }, // 组件样式
      data: {} // 组件数据
    }
  ],
  WORK_EXPERIENCE: [
    {
      keyId: '', // 组件id
      model: 'WORK_EXPERIENCE', // 模块
      cptName: 'WORK_EXPERIENCE_1', // 组件名
      cptOptionsName: 'WORK_EXPERIENCE_OPTIONS',
      cptTitle: '工作经验', // 组件名
      cptX: 0, // 组件x坐标
      cptY: 0, // 组件y坐标
      cptZ: 0, // 组件z坐标
      cptHeight: '50px', // 组件高度
      cptWidth: '100%', // 组件宽度
      layout: '', // 布局在左侧还是右侧
      style: {
        themeColor: '#000', // 主题色
        firstTitleFontSize: '20px', // 一级标题
        textColor: '#757575', // 正文
        textFontSize: '14px',
        textFontWeight: 500,
        titleColor: '#666666', // 二级标题
        titleFontSize: '14px',
        titleFontWeight: 600,
        backgroundColor: '#000',
        mBottom: '35px',
        mTop: '0px',
        pTopBottom: '0', // 上下内边距
        pLeftRight: '40px' // 左右内边距
      }, // 组件样式
      data: {} // 组件数据
    }
  ],
  PROJECT_EXPERIENCE: [
    {
      keyId: '', // 组件id
      model: 'PROJECT_EXPERIENCE', // 模块
      cptName: 'PROJECT_EXPERIENCE_1', // 组件名
      cptOptionsName: 'PROJECT_EXPERIENCE_OPTIONS',
      cptTitle: '项目经验', // 组件名
      cptX: 0, // 组件x坐标
      cptY: 0, // 组件y坐标
      cptZ: 0, // 组件z坐标
      cptHeight: '50px', // 组件高度
      cptWidth: '100%', // 组件宽度
      layout: '', // 布局在左侧还是右侧
      style: {
        themeColor: '#000', // 主题色
        firstTitleFontSize: '20px', // 一级标题
        textColor: '#757575', // 正文
        textFontSize: '14px',
        textFontWeight: 500,
        titleColor: '#666666', // 二级标题
        titleFontSize: '14px',
        titleFontWeight: 600,
        backgroundColor: '#000',
        mBottom: '35px',
        mTop: '0px',
        pTopBottom: '0', // 上下内边距
        pLeftRight: '40px' // 左右内边距
      }, // 组件样式
      data: {} // 组件数据
    }
  ],
  AWARDS: [
    {
      keyId: '', // 组件id
      model: 'AWARDS', // 模块
      cptName: 'AWARDS_1', // 组件名
      cptOptionsName: 'AWARDS_OPTIONS',
      cptTitle: '荣誉奖项', // 组件名
      cptX: 0, // 组件x坐标
      cptY: 0, // 组件y坐标
      cptZ: 0, // 组件z坐标
      cptHeight: '50px', // 组件高度
      cptWidth: '100%', // 组件宽度
      layout: '', // 布局在左侧还是右侧
      style: {
        themeColor: '#000', // 主题色
        firstTitleFontSize: '20px', // 一级标题
        textColor: '#757575', // 正文
        textFontSize: '14px',
        textFontWeight: 500,
        titleColor: '#666666', // 二级标题
        titleFontSize: '14px',
        titleFontWeight: 600,
        backgroundColor: '#000',
        mBottom: '35px',
        mTop: '0px',
        pTopBottom: '0', // 上下内边距
        pLeftRight: '40px' // 左右内边距
      }, // 组件样式
      data: {} // 组件数据
    }
  ],
  HOBBIES: [
    {
      keyId: '', // 组件id
      model: 'HOBBIES', // 模块
      cptName: 'HOBBIES_1', // 组件名
      cptOptionsName: 'HOBBIES_OPTIONS',
      cptTitle: '兴趣爱好', // 组件名
      cptX: 0, // 组件x坐标
      cptY: 0, // 组件y坐标
      cptZ: 0, // 组件z坐标
      cptHeight: '50px', // 组件高度
      cptWidth: '100%', // 组件宽度
      layout: '', // 布局在左侧还是右侧
      style: {
        themeColor: '#000', // 主题色
        firstTitleFontSize: '20px', // 一级标题
        textColor: '#757575', // 正文
        textFontSize: '14px',
        textFontWeight: 500,
        titleColor: '#666666', // 二级标题
        titleFontSize: '14px',
        titleFontWeight: 600,
        backgroundColor: '#000',
        mBottom: '35px',
        mTop: '0px',
        pTopBottom: '0', // 上下内边距
        pLeftRight: '40px' // 左右内边距
      }, // 组件样式
      data: {} // 组件数据
    }
  ],
  SELF_EVALUATION: [
    {
      keyId: '', // 组件id
      model: 'SELF_EVALUATION', // 模块
      cptName: 'SELF_EVALUATION_1', // 组件名
      cptOptionsName: 'SELF_EVALUATION_OPTIONS',
      cptTitle: '自我评价', // 组件名
      cptX: 0, // 组件x坐标
      cptY: 0, // 组件y坐标
      cptZ: 0, // 组件z坐标
      cptHeight: '50px', // 组件高度
      cptWidth: '100%', // 组件宽度
      layout: '', // 布局在左侧还是右侧
      style: {
        themeColor: '#000', // 主题色
        firstTitleFontSize: '20px', // 一级标题
        textColor: '#757575', // 正文
        textFontSize: '14px',
        textFontWeight: 500,
        titleColor: '#666666', // 二级标题
        titleFontSize: '14px',
        titleFontWeight: 600,
        backgroundColor: '#000',
        mBottom: '35px',
        mTop: '0px',
        pTopBottom: '0', // 上下内边距
        pLeftRight: '40px' // 左右内边距
      }, // 组件样式
      data: {} // 组件数据
    }
  ],
  WORKS_DISPLAY: [
    {
      keyId: '', // 组件id
      model: 'WORKS_DISPLAY', // 模块
      cptName: 'WORKS_DISPLAY_1', // 组件名
      cptOptionsName: 'WORKS_DISPLAY_OPTIONS',
      cptTitle: '作评展示', // 组件名
      cptX: 0, // 组件x坐标
      cptY: 0, // 组件y坐标
      cptZ: 0, // 组件z坐标
      cptHeight: '50px', // 组件高度
      cptWidth: '100%', // 组件宽度
      layout: '', // 布局在左侧还是右侧
      style: {
        themeColor: '#000', // 主题色
        firstTitleFontSize: '20px', // 一级标题
        textColor: '#757575', // 正文
        textFontSize: '14px',
        textFontWeight: 500,
        titleColor: '#666666', // 二级标题
        titleFontSize: '14px',
        titleFontWeight: 600,
        backgroundColor: '#000',
        mBottom: '35px',
        mTop: '0px',
        pTopBottom: '0', // 上下内边距
        pLeftRight: '40px' // 左右内边距
      }, // 组件样式
      data: {} // 组件数据
    }
  ]
};
