// 定义样式接口
interface ISTYLE {
  height?: string;
  width?: string;
  titleColor?: string;
  textColor?: string;
  titleFontSize?: string;
  textFontSize?: string;
  titleFontWeight?: number;
  textFontWeight?: number;
  backgroundColor?: string;
  align?: string;
  mTop?: string;
  mRight?: string;
  mLeft?: string;
  mBottom?: string;
  pTop?: string;
  pRight?: string;
  pLeft?: string;
  pBottom?: string;
}
// 简历标题
interface IRESUMETITLE {
  id: number;
  model: string;
  show: boolean;
  title: string;
  style: ISTYLE;
}
// 基础资料
interface IBASEINFO {
  id: number;
  model: string;
  show: boolean;
  title: string;
  name: string;
  age: number;
  address: string; // 所在地址
  avatar: string; // 头像地址
  workService: number; // 工作年限
  phoneNumber: string; // 联系电话
  email: string; // 邮箱
  abstract: string; // 简介
  degree: string;
  isShow: {
    age: boolean;
    address: boolean; // 所在地址
    avatar: boolean; // 头像地址
    workService: boolean; // 工作年限
    phoneNumber: boolean; // 联系电话
    email: boolean; // 邮箱
    abstract: boolean; // 简介
    degree: boolean;
  };
  style: ISTYLE;
}
// 求职意向
interface IJOBINTENTION {
  id: number;
  model: string;
  show: boolean;
  title: string;
  intendedPositions: string; // 意向岗位
  intendedCity: string; // 意向城市
  expectSalary: string; // 期望薪资
  jobStatus: string; // 求职状态
  jobSearchType: string; // 求职类型
  isShow: {
    intendedPositions: boolean,
    intendedCity: boolean,
    expectSalary: boolean,
    jobStatus: boolean,
    jobSearchType: boolean,
  },
  style: ISTYLE;
}
// 教育背景
interface IEDUBACKGROUND {
  id: number;
  model: string;
  show: boolean;
  title: string;
  LIST: Array<{
    date: Array<string>;
    schoolName: string; // 学校名称
    specialized: string; // 专业
    degree: string; // 学历
    majorCourse: string; // 主修课程
  }>;
  isShow: {
    date: boolean,
    schoolName: boolean,
    specialized: boolean,
    degree: boolean
  },
  style: ISTYLE;
}
// 技能特长
interface ISKILLSPECIALTIES {
  id: number;
  model: string;
  show: boolean;
  title: string;
  LIST: Array<{
    skillName: string; // 技能名称
    proficiency: string; // 熟练度
    introduce: string; // 介绍
  }>;
  style: ISTYLE;
}

// 校园经历
interface ICAMPUSEXPERIENCE {
  id: number;
  model: string;
  show: boolean;
  title: string;
  LIST: Array<{
    date: string; // 经历时间
    campusBriefly: string;
    campusDuty: string;
    campusContent: string;
  }>;
  style: ISTYLE;
}

// 项目经验
interface IPROJECTEXPERIENCE {
  id: number;
  model: string;
  show: boolean;
  title: string;
  LIST: Array<{
    date: string; // 项目时间
    projectName: string; // 项目名称
    posts: string; // 项目职责
    projectContent: Array<{
      content: '该项目是一个打杂项目';
    }>;
  }>;
  style: ISTYLE;
}
// 实习经验
interface IINTERNSHIPEXPERIENCE {
  id: number;
  model: string;
  show: boolean;
  title: string;
  LIST: Array<{
    date: string; // 实习时间
    companyName: string; // 公司名称
    posts: string; // 职位
    jobContent: Array<{
      content: string;
    }>;
  }>;
  style: ISTYLE;
}
// 工作经验
interface IWORKEXPERIENCE {
  id: number;
  model: string;
  show: boolean;
  title: string;
  LIST: Array<{
    date: string; // 工作时间
    companyName: string; // 公司名称
    posts: string; // 职位
    jobContent: Array<{
      content: string;
    }>;
  }>;
  style: ISTYLE;
}
// 所获奖项
interface IAWARDS {
  id: number;
  model: string;
  show: boolean;
  title: string;
  LIST: Array<{
    date: string; // 获奖时间
    awardsName: string;
    awardsGrade: string;
  }>;
  style: ISTYLE;
}
// 兴趣爱好
interface IHOBBIES {
  id: number;
  model: string;
  show: boolean;
  title: string;
  content: string;
  style: ISTYLE;
}
// 自我评价
interface ISELFEVALUATION {
  id: number;
  model: string;
  show: boolean;
  title: string;
  content: string;
  style: ISTYLE;
}
// 作品展示
interface IWORKSDISPLAY {
  id: number;
  model: string;
  show: boolean;
  title: string;
  LIST: Array<{
    worksName: string;
    worksLink: string;
    worksIntroduce: string;
  }>;
  style: ISTYLE;
}
// resume格式接口
interface IResumeJson {
  ID: string; // 模板id
  TITLE: string; // 模板名称
  THEME_color: string; // 主题色
  LIST: [
    IRESUMETITLE,
    IBASEINFO,
    IJOBINTENTION,
    IEDUBACKGROUND,
    ISKILLSPECIALTIES,
    ICAMPUSEXPERIENCE,
    IINTERNSHIPEXPERIENCE,
    IWORKEXPERIENCE,
    IPROJECTEXPERIENCE,
    IAWARDS,
    IHOBBIES,
    ISELFEVALUATION,
    IWORKSDISPLAY
  ];
}
export {
  ISTYLE,
  IResumeJson,
  IRESUMETITLE,
  IBASEINFO,
  IJOBINTENTION,
  IEDUBACKGROUND,
  ISKILLSPECIALTIES,
  ICAMPUSEXPERIENCE,
  IWORKEXPERIENCE,
  IPROJECTEXPERIENCE,
  IINTERNSHIPEXPERIENCE,
  IAWARDS,
  IHOBBIES,
  ISELFEVALUATION,
  IWORKSDISPLAY
};
