import { IResumeJson } from '@/interface/model';
let TEMPLATE_JSON: IResumeJson = {
  ID: '', // 模板Id
  NAME: '',
  TITLE: '我的简历',
  LIST: [
    {
      id: '1',
      iconfont: 'icon-xiangmujingli-04',
      model: 'RESUME_TITLE',
      show: true,
      title: '我的简历'
    },
    {
      id: '2',
      iconfont: 'icon-jibenziliao',
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
      degree: '本科',
      isShow: {
        age: true,
        address: true, // 所在地址
        avatar: true, // 头像地址
        workService: true, // 工作年限
        phoneNumber: true, // 联系电话
        email: true, // 邮箱
        abstract: true, // 简介
        degree: true
      }
    },
    {
      id: '3',
      iconfont: 'icon-yixianggangwei',
      model: 'JOB_INTENTION',
      show: true,
      title: '求职意向',
      intendedPositions: '前端开发工程师', // 意向岗位
      intendedCity: '成都', // 意向城市
      expectSalary: '8000-10000', // 期望薪资
      jobStatus: '随时入职', // 求职状态
      jobSearchType: '求职类型',
      isShow: {
        intendedPositions: true,
        intendedCity: true,
        expectSalary: true,
        jobStatus: true,
        jobSearchType: true
      }
    },
    {
      id: '4',
      iconfont: 'icon-education-1-copy',
      model: 'EDU_BACKGROUND',
      show: true,
      title: '教育背景',
      LIST: [
        {
          date: ['2015-5', '2019-6'],
          schoolName: '野鸡大学', // 学校名称
          specialized: '通信工程', // 专业
          degree: '本科', // 学历
          majorCourse: '主修计算机技术、Java、c++等等' // 主修课程
        },
        {
          date: ['2015-5', '2019-6'],
          schoolName: '野鸡大学', // 学校名称
          specialized: '通信工程', // 专业
          degree: '本科', // 学历
          majorCourse: '主修计算机技术、Java、c++等等' // 主修课程
        }
      ],
      isShow: {
        date: true,
        schoolName: true,
        specialized: true,
        degree: true,
        majorCourse: true
      }
    },
    {
      id: '5',
      iconfont: 'icon-zhuanyezhishijineng',
      model: 'SKILL_SPECIALTIES',
      show: true,
      title: '技能特长',
      LIST: [
        {
          skillName: 'JavaScript', // 技能名称
          proficiency: '了解', // 熟练度
          introduce: '熟练掌握该项技术' // 介绍
        },
        {
          skillName: 'JavaScript', // 技能名称
          proficiency: '一般', // 熟练度
          introduce: '熟练掌握该项技术熟练掌握该项技术熟练掌握该项技术熟练掌握该项技术' // 介绍
        },
        {
          skillName: 'JavaScript', // 技能名称
          proficiency: '熟悉', // 熟练度
          introduce: '熟练掌握该项技术熟练掌握该项技术熟练掌握该项技术熟练掌握该项技术' // 介绍
        },
        {
          skillName: 'JavaScript', // 技能名称
          proficiency: '精通', // 熟练度
          introduce: '熟练掌握该项技术' // 介绍
        }
      ]
    },
    {
      id: '6',
      iconfont: 'icon-jiatimianban_timu',
      model: 'CAMPUS_EXPERIENCE',
      show: true,
      title: '校园经历',
      LIST: [
        {
          date: ['2021-9', '2022-10'], // 经历时间
          campusBriefly: '经历简要，如社团名称',
          campusDuty: '主要职责',
          campusContent: '经历描述'
        },
        {
          date: ['2021-9', '2022-10'], // 经历时间
          campusBriefly: '经历简要，如社团名称',
          campusDuty: '主要职责',
          campusContent:
            '经历经历描述经历描述经历描经历描述经历描述经历描述经历描述经历描述述经历描述经历描述经历描述经历描述经历描述描述'
        }
      ],
      isShow: {
        date: true, // 经历时间
        campusBriefly: true,
        campusDuty: true,
        campusContent: true
      }
    },
    {
      id: '9',
      iconfont: 'icon-biyeshixi',
      model: 'INTERNSHIP_EXPERIENCE',
      show: true,
      title: '实习经验',
      LIST: [
        {
          date: ['2021-9', '2022-10'], // 实习时间
          companyName: '业绩公司', // 公司名称
          posts: '前端开发工程师', // 职位
          jobContent: [
            {
              content: '主要工作内容是打杂'
            },
            {
              content:
                '主要工作内容是打杂主要工作内容是打杂主要工作内容是打杂主要工作内容是打杂主要工作内容是打杂'
            },
            {
              content: '主要工作内容是打杂'
            }
          ]
        },
        {
          date: ['2021-9', '2022-10'], // 实习时间
          companyName: '业绩公司', // 公司名称
          posts: '前端开发工程师', // 职位
          jobContent: [
            {
              content: '主要工作内容是打杂'
            },
            {
              content:
                '主要工作内容是打杂主要工作内容是打杂主要工作内容是打杂主要工作内容是打杂主要工作内容是打杂'
            },
            {
              content: '主要工作内容是打杂'
            }
          ]
        }
      ],
      isShow: {
        date: true,
        companyName: true,
        posts: true,
        jobContent: true
      }
    },
    {
      id: '7',
      iconfont: 'icon-gongzuojingyan',
      model: 'WORK_EXPERIENCE',
      show: true,
      title: '工作经验',
      LIST: [
        {
          date: ['2021-9', '2022-10'], // 工作时间
          companyName: '业绩公司', // 公司名称
          posts: '前端开发工程师', // 职位
          jobContent: [
            {
              content: '主要工作内容是打杂'
            }
          ]
        }
      ],
      isShow: {
        date: true,
        companyName: true,
        posts: true
      }
    },
    {
      id: '8',
      iconfont: 'icon-xiangmu',
      model: 'PROJECT_EXPERIENCE',
      show: true,
      title: '项目经验',
      LIST: [
        {
          date: ['2021-9', '2022-10'], // 项目时间
          projectName: '项目名称', // 项目名称
          posts: '前端开发工程师', // 项目职责
          projectContent: [
            {
              content: '该项目是一个打杂项目'
            }
          ]
        }
      ],
      isShow: {
        date: true,
        projectName: true,
        posts: true
      }
    },
    {
      id: '10',
      iconfont: 'icon-rongyu1',
      model: 'AWARDS',
      show: true,
      title: '荣誉奖项',
      LIST: [
        {
          date: '2021-9', // 获奖时间
          awardsName: '奖项名称',
          awardsGrade: '获奖等级'
        }
      ],
      isShow: {
        date: true,
        awardsName: true,
        awardsGrade: true
      }
    },
    {
      id: '11',
      iconfont: 'icon-xingquaihao',
      model: 'HOBBIES',
      show: true,
      title: '兴趣爱好',
      content: '我喜欢打杂我喜欢打杂我喜欢打杂我喜欢打杂我喜欢打杂我喜欢打杂我喜欢打杂我喜欢打杂',
      style: {
        textColor: '#757575',
        textFontSize: '14px',
        textFontWeight: 500,
        mBottom: '45px',
        mTop: '0px'
      }
    },
    {
      id: '12',
      iconfont: 'icon-ziwopingjia',
      model: 'SELF_EVALUATION',
      show: true,
      title: '自我评价',
      content: '我是一个没有责任感的人'
    },
    {
      id: '13',
      iconfont: 'icon-zhuanyezhishijineng',
      model: 'WORKS_DISPLAY',
      show: true,
      title: '作品展示',
      LIST: [
        {
          worksName: '作品名称',
          worksLink: 'https://www.baidu.com',
          worksIntroduce: '这是一个千万级作品'
        },
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
