// resume格式接口
interface IResumeJson {
  ID: string; // 模板id
  TITLE: string; // 模板名称
  THEME_color: string; // 主题色
  LIST: [
    {
      id: number;
      model: string;
      show: boolean;
      title: string;
    },
    {
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
      // 基本资料
    },
    {
      id: number;
      model: string;
      show: boolean;
      title: string;
      intendedPositions: string; // 意向岗位
      intendedCity: string; // 意向城市
      expectSalary: string; // 期望薪资
      jobStatus: string; // 求职状态
      // 求职意向
    },
    {
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
      // 教育背景
    },
    {
      id: number;
      model: string;
      show: boolean;
      title: string;
      LIST: Array<{
        skillName: string; // 技能名称
        proficiency: string; // 熟练度
        introduce: string; // 介绍
      }>;
      // 技能特长
    },
    {
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
      // 校园经历
    },
    {
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
      // 工作经验
    },
    {
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
      // 项目经验
    },
    {
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
      // 实习经验
    },
    {
      id: number;
      model: string;
      show: boolean;
      title: string;

      LIST: Array<{
        date: string; // 获奖时间
        awardsName: string;
        awardsGrade: string;
      }>;
      // 所获奖项
    },
    {
      id: number;
      model: string;
      show: boolean;

      title: string;

      content: string;
      // 兴趣爱好
    },
    {
      id: number;
      model: string;
      show: boolean;
      title: string;
      content: string;
      // 自我评价
    },
    {
      id: number;
      model: string;
      show: true;
      title: string;
      LIST: Array<{
        worksName: string;
        worksLink: string;
        worksIntroduce: string;
      }>;
      // 作品展示
    }
  ];
}
export default IResumeJson;
