// 简历标题
interface IRESUMETITLE {
  id: number;
  model: string;
  show: boolean;
  title: string;
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
}
// 教育背景
interface IEDUBACKGROUND {
  id: number;
  model: string;
  show: boolean;
  title: string;
  LIST: Array<{
    date: string;
    schoolName: string; // 学校名称
    specialized: string; // 专业
    degree: string; // 学历
    majorCourse: string; // 主修课程
  }>;
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
}
// 兴趣爱好
interface IHOBBIES {
  id: number;
  model: string;
  show: boolean;
  title: string;
  content: string;
}
// 自我评价
interface ISELFEVALUATION {
  id: number;
  model: string;
  show: boolean;
  title: string;
  content: string;
}
// 作品展示
interface IWORKSDISPLAY {
  id: number;
  model: string;
  show: true;
  title: string;
  LIST: Array<{
    worksName: string;
    worksLink: string;
    worksIntroduce: string;
  }>;
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
    IWORKEXPERIENCE,
    IPROJECTEXPERIENCE,
    IINTERNSHIPEXPERIENCE,
    IAWARDS,
    IHOBBIES,
    ISELFEVALUATION,
    IWORKSDISPLAY
  ];
}
export {
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
