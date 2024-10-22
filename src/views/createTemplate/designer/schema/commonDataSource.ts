const commonDataSource = {
  resumeTitle: {
    title: {
      type: 'input',
      label: '简历标题',
      value: '我的简历'
    }
  },
  baseInfo: {
    name: {
      type: 'input',
      label: '姓名',
      value: '化简'
    },
    age: {
      type: 'input',
      label: '年龄',
      value: 25
    },
    address: {
      type: 'input',
      label: '所在地区',
      value: '成都'
    }, // 所在地址
    avatar: {
      type: 'avatar',
      label: '证件照',
      value: ''
    }, // 头像地址
    workService: {
      type: 'input',
      label: '工作年限',
      value: 3
    }, // 工作年限
    phoneNumber: {
      type: 'input',
      label: '联系方式',
      value: '028-83032406'
    }, // 联系电话
    email: {
      type: 'input',
      label: '邮箱地址',
      value: '1584775297@qq.com'
    }, // 邮箱
    abstract: {
      type: 'input',
      label: '一句话简介',
      value: '一句话简介，尽量不要太长'
    }, // 简介
    degree: {
      type: 'select',
      label: '学历',
      value: '全日制本科',
      options: []
    }
  },
  jobIntention: {
    intendedPositions: {
      type: 'input',
      label: '意向岗位',
      value: '前端工程师'
    }, // 意向岗位
    intendedCity: {
      type: 'input',
      label: '意向城市',
      value: '成都'
    }, // 意向城市
    expectSalary: {
      type: 'select',
      label: '期望薪资',
      value: '8K ~ 10K',
      options: []
    }, // 期望薪资
    jobStatus: {
      type: 'select',
      label: '求职状态',
      value: '随时入职',
      options: []
    }, // 求职状态
    jobSearchType: {
      type: 'select',
      label: '求职类型',
      value: '全职',
      options: []
    }
  }
};
export default commonDataSource;
