import customCss from '../../customCss';

export default {
  id: 'BaseInfo_8', // 组件唯一性id
  componentName: 'BaseInfo_8', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '基本资料', // 组件中文名称
  description: '基本信息模块', // 组件描述信息
  screenShot: {
    width: '47%',
    url: '',
    name: 'BaseInfo_8.png'
  }, // 组件快照
  keywords: '基础信息', // 组件关键词，用于搜索
  category: 'base_info', // 组件分类
  props: {
    title: {
      chName: '模块标题',
      show: true,
      iconfont: 'icon-jibenziliao',
      config: true
    },
    age: {
      chName: '年龄',
      show: true,
      iconfont: 'icon-renwu-ren',
      config: true
    },
    address: {
      chName: '地址',
      show: true,
      iconfont: 'icon-zhiyuandidian3',
      config: true
    }, // 所在地址
    workService: {
      chName: '工作年限',
      show: true,
      iconfont: 'icon-gongzuojingyan',
      config: true
    }, // 工作年限
    phoneNumber: {
      chName: '联系电话',
      show: true,
      iconfont: 'icon-dianhua1',
      config: true
    }, // 联系电话
    email: {
      chName: '邮箱地址',
      show: true,
      iconfont: 'icon-youxiang',
      config: true
    }, // 邮箱
    degree: {
      chName: '学历',
      show: false,
      iconfont: 'icon-jiaoyu',
      config: true
    },
    abstract: {
      chName: '一句话简介',
      show: true,
      iconfont: '',
      config: false // 是否支持配置
    }, // 简介
    avatar: {
      chName: '证件照',
      show: true,
      iconfont: '',
      config: false // 是否支持配置
    }, // 头像地址
    name: {
      chName: '姓名',
      show: true,
      iconfont: '',
      config: false // 是否支持配置
    }
  }, // 组件属性
  css: {
    width: '100%',
    height: 385,
    display: 'flex',
    flexDirection: 'column',
    background: 'none',
    padding: {
      top: 30,
      right: 0,
      bottom: 0,
      left: 0
    }
  }, // 组件样式
  customCss: customCss['BaseInfo_8'],
  dataSource: {}, // 组件单独数据
  customProps: {
    // 不需要展示数据配置项
    dataSourceNotShow: {
      name: true,
      abstract: true,
      avatar: true
    }
  } // 自定义属性字段
};
