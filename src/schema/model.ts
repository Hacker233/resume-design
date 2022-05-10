import IResumeJson from '@/types/model';
let TEMPLATE_JSON: IResumeJson = {
  ID: '', // 模板Id
  TITLE: '我的简历',
  THEME_color: '#000',
  LIST: [
    {
      id: 1,
      model: 'RESUM_TITLE',
      show: true,
      title: '我的简历'
    },
    {
      id: 2,
      model: 'BASE_INFO',
      show: true,
      title: '基本资料',
      name: '小猪课堂',
      age: 25,
      address: '四川成都', // 所在地址
      avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', // 头像地址
      workService: 3, // 工作年限
      phoneNumber: '028-1234321', // 联系电话
      email: '12322233@qq.com', // 邮箱
      abstract: '我是一个没有感情的工作机器', // 简介
      degree: '本科'
    },
    {
      id: 3,
      model: 'JOB_INTENTION',
      show: true,
      title: '求职意向',
      intendedPositions: '前端开发工程师', // 意向岗位
      intendedCity: '成都', // 意向城市
      expectSalary: '8000-10000', // 期望薪资
      jobStatus: '随时入职' // 求职状态
    },
    {
      id: 4,
      model: 'EDU_BACKGROUND',
      show: true,
      title: '教育背景',
      LIST: [
        {
          date: '2015.5-2019.6',
          schoolName: '野鸡大学', // 学校名称
          specialized: '通信工程', // 专业
          degree: '本科', // 学历
          majorCourse: '主修计算机技术、Java、c++等等' // 主修课程
        }
      ]
    },
    {
      id: 5,
      model: 'SKILL_SPECIALTIES',
      show: true,
      title: '技能特长',
      LIST: [
        {
          skillName: 'JavaScript', // 技能名称
          proficiency: '一般', // 熟练度
          introduce: '熟练掌握该项技术' // 介绍
        }
      ]
    },
    {
      id: 6,
      model: 'CAMPUS_EXPERIENCE',
      show: true,
      title: '校园经历',
      LIST: [
        {
          date: '2021.9-2022.10', // 经历时间
          campusBriefly: '经历简要，如社团名称',
          campusDuty: '主要职责',
          campusContent: '经历描述'
        }
      ]
    },
    {
      id: 7,
      model: 'WORK_EXPERIENCE',
      show: true,
      title: '工作经验',
      LIST: [
        {
          date: '2021.9-2022.10', // 工作时间
          companyName: '业绩公司', // 公司名称
          posts: '前端开发工程师', // 职位
          jobContent: [
            {
              content: '主要工作内容是打杂'
            }
          ]
        }
      ]
    },
    {
      id: 8,
      model: 'PROJECT_EXPERIENCE',
      show: true,
      title: '项目经验',
      LIST: [
        {
          date: '2021.9-2022.10', // 项目时间
          projectName: '项目名称', // 项目名称
          posts: '前端开发工程师', // 项目职责
          projectContent: [
            {
              content: '该项目是一个打杂项目'
            }
          ]
        }
      ]
    },
    {
      id: 9,
      model: 'INTERNSHIP_EXPERIENCE',
      show: true,
      title: '实习经验',
      LIST: [
        {
          date: '2021.9-2022.10', // 实习时间
          companyName: '业绩公司', // 公司名称
          posts: '前端开发工程师', // 职位
          jobContent: [
            {
              content: '主要工作内容是打杂'
            }
          ]
        }
      ]
    },
    {
      id: 10,
      model: 'AWARDS',
      show: true,
      title: '所获奖项',
      LIST: [
        {
          date: '2021.9', // 获奖时间
          awardsName: '奖项名称',
          awardsGrade: '获奖等级'
        }
      ]
    },
    {
      id: 11,
      model: 'HOBBIES',
      show: true,
      title: '兴趣爱好',
      content: '我喜欢打杂'
    },
    {
      id: 12,
      model: 'SELF_EVALUATION',
      show: true,
      title: '自我评价',
      content: '我是一个没有责任感的人'
    },
    {
      id: 13,
      model: 'WORKS_DISPLAY',
      show: true,
      title: '作品展示',
      LIST: [
        {
          worksName: '作品名称',
          worksLink: 'https://www.baidu.com',
          worksIntroduce: '这是一个千万级作品'
        }
      ]
    }
  ]
};
export default TEMPLATE_JSON;
