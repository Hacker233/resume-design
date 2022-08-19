let IMPORT_JSON = {
  TITLE: '我的简历',
  LAYOUT: '', // 布局模式
  LIST: [
    {
      model: 'RESUME_TITLE',
      title: '我的简历'
    },
    {
      model: 'BASE_INFO',
      title: '基本资料',
      name: '小猪课堂',
      age: 25,
      address: '四川成都',
      avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      workService: 3,
      phoneNumber: '028-1234321',
      email: '12322233@qq.com',
      abstract: '我是一个没有感情的工作机器',
      degree: '本科'
    },
    {
      model: 'JOB_INTENTION',
      title: '求职意向',
      intendedPositions: '前端开发工程师',
      intendedCity: '成都',
      expectSalary: '8000-10000',
      jobStatus: '随时入职',
      jobSearchType: '求职类型'
    },
    {
      model: 'EDU_BACKGROUND',
      title: '教育背景',
      LIST: [
        {
          date: ['2015-5', '2019-6'],
          schoolName: '野鸡大学',
          specialized: '通信工程',
          degree: '本科',
          majorCourse: '主修计算机技术、Java、c++等等'
        }
      ]
    },
    {
      model: 'SKILL_SPECIALTIES',
      title: '技能特长',
      LIST: [
        {
          skillName: 'JavaScript',
          proficiency: '了解',
          introduce: '熟练掌握该项技术'
        }
      ]
    },
    {
      model: 'CAMPUS_EXPERIENCE',
      title: '校园经历',
      LIST: [
        {
          date: ['2021-9', '2022-10'],
          campusBriefly: '经历简要，如社团名称',
          campusDuty: '主要职责',
          campusContent: '经历描述'
        }
      ]
    },
    {
      model: 'INTERNSHIP_EXPERIENCE',
      title: '实习经验',
      LIST: [
        {
          date: ['2021-9', '2022-10'],
          companyName: '业绩公司',
          posts: '前端开发工程师',
          jobContent: [
            {
              content: '主要工作内容是打杂'
            }
          ]
        }
      ]
    },
    {
      model: 'WORK_EXPERIENCE',
      title: '工作经验',
      LIST: [
        {
          date: ['2021-9', '2022-10'],
          companyName: '业绩公司',
          posts: '前端开发工程师',
          jobContent: [
            {
              content: '主要工作内容是打杂'
            }
          ]
        }
      ]
    },
    {
      model: 'PROJECT_EXPERIENCE',
      title: '项目经验',
      LIST: [
        {
          date: ['2021-9', '2022-10'],
          projectName: '项目名称',
          posts: '前端开发工程师',
          projectContent: [
            {
              content: '该项目是一个打杂项目'
            }
          ]
        }
      ]
    },
    {
      model: 'AWARDS',
      title: '荣誉奖项',
      LIST: [
        {
          date: '2021-9',
          awardsName: '奖项名称',
          awardsGrade: '获奖等级'
        }
      ]
    },
    {
      model: 'HOBBIES',
      title: '兴趣爱好',
      content: '我喜欢打杂我喜欢打杂我喜欢打杂我喜欢打杂我喜欢打杂我喜欢打杂我喜欢打杂我喜欢打杂'
    },
    {
      model: 'SELF_EVALUATION',
      title: '自我评价',
      content: '我是一个没有责任感的人'
    },
    {
      model: 'WORKS_DISPLAY',
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
export default IMPORT_JSON;