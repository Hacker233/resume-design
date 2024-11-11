const commonDataSource: any = {
  resume_title: {
    title: {
      type: 'input',
      label: '简历标题',
      value: '我的简历',
      props: {
        width: '49%'
      }
    }
  },
  base_info: {
    name: {
      type: 'input',
      label: '姓名',
      value: '化简',
      props: {
        width: '49%'
      }
    },
    age: {
      type: 'input',
      label: '年龄',
      value: 25,
      props: {
        width: '49%'
      }
    },
    address: {
      type: 'input',
      label: '所在地区',
      value: '成都',
      props: {
        width: '49%'
      }
    }, // 所在地址
    avatar: {
      type: 'avatar',
      label: '证件照',
      value: '',
      props: {
        width: '49%'
      }
    }, // 头像地址
    workService: {
      type: 'input',
      label: '工作年限',
      value: 3,
      props: {
        width: '49%'
      }
    }, // 工作年限
    phoneNumber: {
      type: 'input',
      label: '联系方式',
      value: '028-83032406',
      props: {
        width: '49%'
      }
    }, // 联系电话
    email: {
      type: 'input',
      label: '邮箱地址',
      value: '1584775297@qq.com',
      props: {
        width: '49%'
      }
    }, // 邮箱
    abstract: {
      type: 'input',
      label: '一句话简介',
      value: '一句话简介，尽量不要太长',
      props: {
        width: '49%'
      }
    }, // 简介
    degree: {
      type: 'select',
      label: '学历',
      value: '全日制本科',
      options: [],
      props: {
        width: '49%'
      }
    }
  },
  job_intention: {
    intendedPositions: {
      type: 'input',
      label: '意向岗位',
      value: '前端工程师',
      props: {
        width: '49%'
      }
    }, // 意向岗位
    intendedCity: {
      type: 'input',
      label: '意向城市',
      value: '成都',
      props: {
        width: '49%'
      }
    }, // 意向城市
    expectSalary: {
      type: 'select',
      label: '期望薪资',
      value: '8K ~ 10K',
      options: [],
      props: {
        width: '49%'
      }
    }, // 期望薪资
    jobStatus: {
      type: 'select',
      label: '求职状态',
      value: '随时入职',
      options: [],
      props: {
        width: '49%'
      }
    }, // 求职状态
    jobSearchType: {
      type: 'select',
      label: '求职类型',
      value: '全职',
      options: [],
      props: {
        width: '49%'
      }
    }
  },
  edu_background: {
    list: {
      type: 'list',
      label: '教育背景',
      value: [
        {
          date: {
            type: 'datePicker',
            label: '教育日期',
            value: ['2015-5', '2019-6'],
            props: {
              width: '49%'
            }
          },
          schoolName: {
            type: 'input',
            label: '学校名称',
            value: '化简科技大学',
            props: {
              width: '49%'
            }
          },
          specialized: {
            type: 'input',
            label: '所学专业',
            value: '计算机科学与技术',
            props: {
              width: '49%'
            }
          },
          degree: {
            type: 'select',
            label: '学历',
            value: '全日制本科',
            options: [],
            props: {
              width: '49%'
            }
          },
          majorCourse: {
            type: 'editor',
            label: '主修课程',
            value: '计算机科学与技术、情报管理学、高等数学等等',
            props: {
              width: '100%'
            }
          }
        },
        {
          date: {
            type: 'datePicker',
            label: '教育日期',
            value: ['2015-5', '2019-6'],
            props: {
              width: '49%'
            }
          },
          schoolName: {
            type: 'input',
            label: '学校名称',
            value: '中山大学',
            props: {
              width: '49%'
            }
          },
          specialized: {
            type: 'input',
            label: '所学专业',
            value: '软件工程',
            props: {
              width: '49%'
            }
          },
          degree: {
            type: 'select',
            label: '学历',
            value: '硕士',
            options: [],
            props: {
              width: '49%'
            }
          },
          majorCourse: {
            type: 'editor',
            label: '主修课程',
            value: '计算机科学与技术、情报管理学、高等数学等等',
            props: {
              width: '100%'
            }
          }
        }
      ],
      props: {
        width: '100%'
      }
    }
  },
  skill_specialties: {
    list: {
      type: 'list',
      label: '技能特长',
      value: [
        {
          skillName: {
            type: 'input',
            label: '技能名称',
            value: 'photoshop',
            props: {
              width: '49%'
            }
          },
          proficiency: {
            type: 'select',
            label: '熟练度',
            value: '熟悉',
            options: [],
            props: {
              width: '49%'
            }
          },
          introduce: {
            type: 'textarea',
            label: '技能介绍',
            value: '简要概述对该项技能的掌握及运用程度等等',
            props: {
              width: '100%'
            }
          }
        },
        {
          skillName: {
            type: 'input',
            label: '技能名称',
            value: 'JavaScript',
            props: {
              width: '49%'
            }
          },
          proficiency: {
            type: 'select',
            label: '熟练度',
            value: '熟悉',
            options: [],
            props: {
              width: '49%'
            }
          },
          introduce: {
            type: 'textarea',
            label: '技能介绍',
            value: '简要概述对该项技能的掌握及运用程度等等',
            props: {
              width: '100%'
            }
          }
        },
        {
          skillName: {
            type: 'input',
            label: '技能名称',
            value: 'HTML',
            props: {
              width: '49%'
            }
          },
          proficiency: {
            type: 'select',
            label: '熟练度',
            value: '熟悉',
            options: [],
            props: {
              width: '49%'
            }
          },
          introduce: {
            type: 'textarea',
            label: '技能介绍',
            value: '简要概述对该项技能的掌握及运用程度等等',
            props: {
              width: '100%'
            }
          }
        },
        {
          skillName: {
            type: 'input',
            label: '技能名称',
            value: 'Vue3',
            props: {
              width: '49%'
            }
          },
          proficiency: {
            type: 'select',
            label: '熟练度',
            value: '熟悉',
            options: [],
            props: {
              width: '49%'
            }
          },
          introduce: {
            type: 'textarea',
            label: '技能介绍',
            value: '简要概述对该项技能的掌握及运用程度等等',
            props: {
              width: '100%'
            }
          }
        }
      ],
      props: {
        width: '100%'
      }
    }
  },
  campus_experience: {
    list: {
      type: 'list',
      label: '校园经历',
      value: [
        {
          date: {
            type: 'datePicker',
            label: '经历时期',
            value: ['2015-5', '2019-6'],
            props: {
              width: '49%'
            }
          },
          campusBriefly: {
            type: 'input',
            label: '经历简要',
            value: '电子商务大赛',
            props: {
              width: '49%'
            }
          },
          campusDuty: {
            type: 'input',
            label: '主要职责',
            value: '大赛队长',
            props: {
              width: '49%'
            }
          },
          campusContent: {
            type: 'textarea',
            label: '经历内容',
            value: '如负责大赛PPT的制作、以及赛后沟通等这项工作',
            props: {
              width: '100%'
            }
          }
        },
        {
          date: {
            type: 'datePicker',
            label: '经历时期',
            value: ['2015-5', '2019-6'],
            props: {
              width: '49%'
            }
          },
          campusBriefly: {
            type: 'input',
            label: '经历简要',
            value: '象棋大赛',
            props: {
              width: '49%'
            }
          },
          campusDuty: {
            type: 'input',
            label: '主要职责',
            value: '组织人员',
            props: {
              width: '49%'
            }
          },
          campusContent: {
            type: 'textarea',
            label: '经历内容',
            value: '全程组织并参与校园象棋大赛，包括相关报道的编写',
            props: {
              width: '100%'
            }
          }
        }
      ],
      props: {
        width: '100%'
      }
    }
  },
  internship_experience: {
    list: {
      type: 'list',
      label: '实习经验',
      value: [
        {
          date: {
            type: 'datePicker',
            label: '实习日期',
            value: ['2021-9', '2022-10'],
            props: {
              width: '49%'
            }
          },
          contentTtile: {
            type: 'input',
            label: '内容标题',
            value: '实习内容',
            props: {
              width: '49%'
            }
          },
          companyName: {
            type: 'input',
            label: '公司名称',
            value: '化简科技股份有限公司',
            props: {
              width: '49%'
            }
          },
          posts: {
            type: 'input',
            label: '担任职位',
            value: '前端开发工程师',
            props: {
              width: '49%'
            }
          },
          jobContent: {
            type: 'listLi',
            label: '实习内容',
            value: [
              {
                content: {
                  type: 'textarea',
                  label: '内容',
                  value: '主要负责相关功能模块的前端开发、部署运维等工作',
                  props: {
                    width: '95%'
                  }
                }
              },
              {
                content: {
                  type: 'textarea',
                  label: '内容',
                  value: '主要负责相关功能模块的前端开发、部署运维等工作',
                  props: {
                    width: '95%'
                  }
                }
              },
              {
                content: {
                  type: 'textarea',
                  label: '内容',
                  value: '主要负责相关功能模块的前端开发、部署运维等工作',
                  props: {
                    width: '95%'
                  }
                }
              },
              {
                content: {
                  type: 'textarea',
                  label: '内容',
                  value: '主要负责相关功能模块的前端开发、部署运维等工作',
                  props: {
                    width: '95%'
                  }
                }
              }
            ],
            props: {
              width: '100%'
            }
          }
        }
      ],
      props: {
        width: '100%'
      }
    }
  },
  work_experience: {
    list: {
      type: 'list',
      label: '工作经验',
      value: [
        {
          date: {
            type: 'datePicker',
            label: '工作日期',
            value: ['2021-10', '2022-10'],
            props: {
              width: '49%'
            }
          },
          contentTtile: {
            type: 'input',
            label: '内容标题',
            value: '工作内容',
            props: {
              width: '49%'
            }
          },
          companyName: {
            type: 'input',
            label: '公司名称',
            value: '化简科技股份有限公司',
            props: {
              width: '49%'
            }
          },
          posts: {
            type: 'input',
            label: '担任职位',
            value: '前端开发工程师',
            props: {
              width: '49%'
            }
          },
          jobContent: {
            type: 'listLi',
            label: '工作内容',
            value: [
              {
                content: {
                  type: 'textarea',
                  label: '内容',
                  value: '主要负责相关功能模块的前端开发、部署运维等工作',
                  props: {
                    width: '95%'
                  }
                }
              },
              {
                content: {
                  type: 'textarea',
                  label: '内容',
                  value: '主要负责相关功能模块的前端开发、部署运维等工作',
                  props: {
                    width: '95%'
                  }
                }
              },
              {
                content: {
                  type: 'textarea',
                  label: '内容',
                  value: '主要负责相关功能模块的前端开发、部署运维等工作',
                  props: {
                    width: '95%'
                  }
                }
              },
              {
                content: {
                  type: 'textarea',
                  label: '内容',
                  value: '主要负责相关功能模块的前端开发、部署运维等工作',
                  props: {
                    width: '95%'
                  }
                }
              }
            ],
            props: {
              width: '100%'
            }
          }
        }
      ],
      props: {
        width: '100%'
      }
    }
  },
  project_experience: {
    list: {
      type: 'list',
      label: '项目经验',
      value: [
        {
          date: {
            type: 'datePicker',
            label: '项目日期',
            value: ['2021-10', '2022-10'],
            props: {
              width: '49%'
            }
          },
          contentTtile: {
            type: 'input',
            label: '内容标题',
            value: '项目内容',
            props: {
              width: '49%'
            }
          },
          companyName: {
            type: 'input',
            label: '项目名称',
            value: '化简开源项目',
            props: {
              width: '49%'
            }
          },
          posts: {
            type: 'input',
            label: '项目角色',
            value: '全栈开发工程师',
            props: {
              width: '49%'
            }
          },
          jobContent: {
            type: 'listLi',
            label: '项目内容',
            value: [
              {
                content: {
                  type: 'textarea',
                  label: '内容',
                  value: '主要负责相关功能模块的前端开发、部署运维等工作',
                  props: {
                    width: '95%'
                  }
                }
              },
              {
                content: {
                  type: 'textarea',
                  label: '内容',
                  value: '主要负责相关功能模块的前端开发、部署运维等工作',
                  props: {
                    width: '95%'
                  }
                }
              },
              {
                content: {
                  type: 'textarea',
                  label: '内容',
                  value: '主要负责相关功能模块的前端开发、部署运维等工作',
                  props: {
                    width: '95%'
                  }
                }
              },
              {
                content: {
                  type: 'textarea',
                  label: '内容',
                  value: '主要负责相关功能模块的前端开发、部署运维等工作',
                  props: {
                    width: '95%'
                  }
                }
              }
            ],
            props: {
              width: '100%'
            }
          }
        }
      ],
      props: {
        width: '100%'
      }
    }
  },
  awards: {
    list: {
      type: 'list',
      label: '荣誉奖项',
      value: [
        {
          date: {
            type: 'date',
            label: '获奖日期',
            value: '2019-6',
            props: {
              width: '49%'
            }
          },
          awardsName: {
            type: 'input',
            label: '奖项名称',
            value: '校级象棋大赛',
            props: {
              width: '49%'
            }
          },
          awardsGrade: {
            type: 'input',
            label: '奖项等级',
            value: '校级三等奖',
            props: {
              width: '49%'
            }
          },
          awardsAbstract: {
            type: 'textarea',
            label: '奖项简介',
            value: '该比赛是全国性质的比赛，主要是锻炼学生的创新能力，以及学习沟通能力',
            props: {
              width: '100%'
            }
          }
        },
        {
          date: {
            type: 'date',
            label: '获奖日期',
            value: '2019-7',
            props: {
              width: '49%'
            }
          },
          awardsName: {
            type: 'input',
            label: '奖项名称',
            value: '国家奖学金',
            props: {
              width: '49%'
            }
          },
          awardsGrade: {
            type: 'input',
            label: '奖项等级',
            value: '一等奖学金',
            props: {
              width: '49%'
            }
          },
          awardsAbstract: {
            type: 'textarea',
            label: '奖项简介',
            value: '该比赛是全国性质的比赛，主要是锻炼学生的创新能力，以及学习沟通能力',
            props: {
              width: '100%'
            }
          }
        }
      ],
      props: {
        width: '100%'
      }
    }
  },
  hobbies: {
    content: {
      type: 'textarea',
      label: '兴趣爱好',
      value: '我喜欢打篮球、看电影、阅读，我也喜欢很多极限运动等等',
      props: {
        width: '100%'
      }
    }
  },
  self_evaluation: {
    content: {
      type: 'textarea',
      label: '自我评价',
      value: '我个人擅长编写代码、与人沟通，为人和善、助人为乐等等',
      props: {
        width: '100%'
      }
    }
  },
  works_display: {
    list: {
      type: 'list',
      label: '作品展示',
      value: [
        {
          worksName: {
            type: 'input',
            label: '作品名称',
            value: '化简',
            props: {
              width: '49%'
            }
          },
          worksLink: {
            type: 'input',
            label: '作品链接',
            value: 'https://91huajian.cn',
            props: {
              width: '49%'
            }
          },
          worksIntroduce: {
            type: 'textarea',
            label: '作品简介',
            value: '该项目是一个开源项目，主要用户简历制作等等',
            props: {
              width: '100%'
            }
          }
        },
        {
          worksName: {
            type: 'input',
            label: '作品名称',
            value: '化简',
            props: {
              width: '49%'
            }
          },
          worksLink: {
            type: 'input',
            label: '作品链接',
            value: 'https://91huajian.cn',
            props: {
              width: '49%'
            }
          },
          worksIntroduce: {
            type: 'textarea',
            label: '作品简介',
            value: '该项目是一个开源项目，主要用户简历制作等等',
            props: {
              width: '100%'
            }
          }
        }
      ],
      props: {
        width: '100%'
      }
    }
  },
  custom_1: {
    name: {
      type: 'input',
      label: '姓名',
      value: '化简',
      props: {
        width: '49%'
      }
    },
    abstract: {
      type: 'textarea',
      label: '一句话简介',
      value: '一个唯心主义者，永远在追逐梦想的道路上',
      props: {
        width: '100%'
      }
    }
  },
  custom_2: {
    name: {
      type: 'input',
      label: '姓名',
      value: '化简',
      props: {
        width: '49%'
      }
    },
    abstract: {
      type: 'textarea',
      label: '一句话简介',
      value: '一个唯心主义者，永远在追逐梦想的道路上',
      props: {
        width: '100%'
      }
    }
  }
};
export default commonDataSource;
