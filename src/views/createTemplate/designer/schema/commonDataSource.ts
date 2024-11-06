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
  }
};
export default commonDataSource;
