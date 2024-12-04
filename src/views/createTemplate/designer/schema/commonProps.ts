const commonProps = {
  resumeTitle: {
    title: {
      chName: '简历标题',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    }
  },
  baseInfo: {
    title: {
      chName: '模块标题',
      show: false,
      iconfont: '',
      config: true // 是否支持配置
    },
    name: {
      chName: '姓名',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    age: {
      chName: '年龄',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    address: {
      chName: '地址',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    }, // 所在地址
    avatar: {
      chName: '证件照',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    }, // 头像地址
    workService: {
      chName: '工作年限',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    }, // 工作年限
    phoneNumber: {
      chName: '联系电话',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    }, // 联系电话
    email: {
      chName: '邮箱地址',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    }, // 邮箱
    abstract: {
      chName: '一句话简介',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    }, // 简介
    degree: {
      chName: '学历',
      show: false,
      iconfont: '',
      config: true // 是否支持配置
    }
  },
  jobIntention: {
    title: {
      chName: '求职意向',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    intendedPositions: {
      chName: '意向岗位',
      show: true,
      iconfont: 'icon-yixianggangwei',
      config: true // 是否支持配置
    },
    intendedCity: {
      chName: '意向城市',
      show: true,
      iconfont: 'icon-zhiyuandidian3',
      config: true // 是否支持配置
    },
    expectSalary: {
      chName: '期望薪资',
      show: true,
      iconfont: 'icon-nianduxinchou',
      config: true // 是否支持配置
    },
    jobStatus: {
      chName: '求职状态',
      show: true,
      iconfont: 'icon-ruzhiriqi',
      config: true // 是否支持配置
    },
    jobSearchType: {
      chName: '求职类型',
      show: true,
      iconfont: 'icon-gongzuoleixing',
      config: true // 是否支持配置
    }
  },
  eduBackground: {
    title: {
      chName: '教育背景',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    date: {
      chName: '教育日期',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    schoolName: {
      chName: '学校名称',
      show: true,
      iconfont: '',
      config: true
    },
    specialized: {
      chName: '所学专业',
      show: true,
      iconfont: '',
      config: true
    },
    degree: {
      chName: '学历',
      show: true,
      iconfont: '',
      config: true
    },
    majorCourse: {
      chName: '主修课程',
      show: true,
      iconfont: '',
      config: true
    }
  },
  skillSpecialties: {
    title: {
      chName: '技能特长',
      show: true,
      iconfont: '',
      config: true
    },
    skillName: {
      chName: '技能名称',
      show: true,
      iconfont: '',
      config: true
    },
    proficiency: {
      chName: '熟练度',
      show: true,
      iconfont: '',
      config: true
    },
    introduce: {
      chName: '技能介绍',
      show: true,
      iconfont: '',
      config: true
    }
  },
  campusExperience: {
    title: {
      chName: '校园经历',
      show: true,
      iconfont: '',
      config: true
    },
    date: {
      chName: '经历时期',
      show: true,
      iconfont: '',
      config: true
    },
    campusBriefly: {
      chName: '经历简要',
      show: true,
      iconfont: '',
      config: true
    },
    campusDuty: {
      chName: '主要职责',
      show: true,
      iconfont: '',
      config: true
    },
    campusContent: {
      chName: '经历内容',
      show: true,
      iconfont: '',
      config: true
    }
  },
  internshipExperience: {
    title: {
      chName: '实习经验',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    date: {
      chName: '实习日期',
      show: true,
      iconfont: '',
      config: true
    },
    contentTtile: {
      chName: '内容标题',
      show: true,
      iconfont: '',
      config: true
    },
    companyName: {
      chName: '公司名称',
      show: true,
      iconfont: '',
      config: true
    },
    posts: {
      chName: '担任职位',
      show: true,
      iconfont: '',
      config: true
    },
    jobContent: {
      chName: '实习内容',
      show: true,
      iconfont: '',
      config: true
    }
  },
  workExperience: {
    title: {
      chName: '工作经验',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    date: {
      chName: '工作日期',
      show: true,
      iconfont: '',
      config: true
    },
    contentTtile: {
      chName: '内容标题',
      show: true,
      iconfont: '',
      config: true
    },
    companyName: {
      chName: '公司名称',
      show: true,
      iconfont: '',
      config: true
    },
    posts: {
      chName: '担任职位',
      show: true,
      iconfont: '',
      config: true
    },
    jobContent: {
      chName: '工作内容',
      show: true,
      iconfont: '',
      config: true
    }
  },
  projectExperience: {
    title: {
      chName: '项目经验',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    date: {
      chName: '项目日期',
      show: true,
      iconfont: '',
      config: true
    },
    contentTtile: {
      chName: '内容标题',
      show: true,
      iconfont: '',
      config: true
    },
    companyName: {
      chName: '项目名称',
      show: true,
      iconfont: '',
      config: true
    },
    posts: {
      chName: '项目角色',
      show: true,
      iconfont: '',
      config: true
    },
    jobContent: {
      chName: '项目内容',
      show: true,
      iconfont: '',
      config: true
    }
  },
  awards: {
    title: {
      chName: '荣誉奖项',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    date: {
      chName: '获奖日期',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    awardsName: {
      chName: '奖项名称',
      show: true,
      iconfont: '',
      config: true
    },
    awardsGrade: {
      chName: '奖项等级',
      show: true,
      iconfont: '',
      config: true
    },
    awardsAbstract: {
      chName: '奖项简介',
      show: false,
      iconfont: '',
      config: true
    }
  },
  hobbies: {
    title: {
      chName: '兴趣爱好',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    content: {
      chName: '兴趣爱好',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    }
  },
  self_evaluation: {
    title: {
      chName: '自我评价',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    content: {
      chName: '自我评价',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    }
  },
  works_display: {
    title: {
      chName: '作品展示',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    worksName: {
      chName: '作品名称',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    worksLink: {
      chName: '作品链接',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    worksIntroduce: {
      chName: '作品简介',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    }
  },
  custom_1: {
    title: {
      chName: '自定义模块_1',
      show: false,
      iconfont: '',
      config: true // 是否支持配置
    },
    name: {
      chName: '姓名',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    abstract: {
      chName: '一句话简介',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    }
  },
  custom_2: {
    title: {
      chName: '自定义模块_2',
      show: false,
      iconfont: '',
      config: true // 是否支持配置
    },
    name: {
      chName: '姓名',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    abstract: {
      chName: '一句话简介',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    }
  },
  custom_3: {
    title: {
      chName: '自定义模块_3',
      show: false,
      iconfont: '',
      config: true // 是否支持配置
    },
    name: {
      chName: '姓名',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    abstract: {
      chName: '一句话简介',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    },
    avatar: {
      chName: '证件照',
      show: true,
      iconfont: '',
      config: true // 是否支持配置
    } // 头像地址
  }
};
export default commonProps;
