import commonCss from '../commonCss';
import commonDataSource from '../commonDataSource';
import commonProps from '../commonProps';
import customCss from '../customCss';

const base_info = {
  id: 'baseInfo', // 模块id
  moduleChName: '基本资料', // 模块中文名
  category: 'baseInfo', // 模块分了
  icon: 'icon-jichuxinxi', // 模块图标
  props: commonProps['baseInfo'], // 公共的props
  dataSource: commonDataSource['baseInfo'], // 该分类下公用数据源
  css: commonCss['baseInfo'],
  list: [
    {
      id: 'BaseInfo_1', // 组件唯一性id
      componentName: 'BaseInfo_1', // 组件名
      commentType: '', // 组件类型
      icon: '', // 组件icon
      title: '基本信息_1', // 组件中文名称
      description: '基本信息模块', // 组件描述信息
      screenShot: {
        width: '',
        url: '',
        name: 'BaseInfo_1.png'
      }, // 组件快照
      keywords: '基础信息', // 组件关键词，用于搜索
      category: 'base_info', // 组件分类
      props: {}, // 组件属性
      css: {
        alignItems: 'flex-end',
        padding: {
          top: 0,
          right: 5,
          bottom: 15,
          left: 40
        }
      }, // 组件样式
      customCss: customCss['BaseInfo_1'],
      dataSource: {}, // 组件单独数据
      customProps: {} // 自定义属性字段
    },
    {
      id: 'BaseInfo_2', // 组件唯一性id
      componentName: 'BaseInfo_2', // 组件名
      commentType: '', // 组件类型
      icon: '', // 组件icon
      title: '基本信息_2', // 组件中文名称
      description: '基本信息模块', // 组件描述信息
      screenShot: {
        width: '100%',
        url: '',
        name: 'BaseInfo_2.png'
      }, // 组件快照
      keywords: '基础信息', // 组件关键词，用于搜索
      category: 'base_info', // 组件分类
      props: {}, // 组件属性
      css: {
        backgroundPath: 'baseInfo_2.png', // 背景图片地址
        backgroundRepeat: 'no-repeat',
        alignItems: 'flex-start',
        height: 250,
        padding: {
          top: 40,
          right: 45,
          bottom: 0,
          left: 45
        }
      }, // 组件样式
      customCss: customCss['BaseInfo_2'],
      dataSource: {}, // 组件单独数据
      customProps: {} // 自定义属性字段
    },
    {
      id: 'BaseInfo_3', // 组件唯一性id
      componentName: 'BaseInfo_3', // 组件名
      commentType: '', // 组件类型
      icon: '', // 组件icon
      title: '基础信息', // 组件中文名称
      description: '基础信息模块', // 组件描述信息
      screenShot: {
        width: '100%',
        url: '',
        name: 'BaseInfo_3.png'
      }, // 组件快照
      keywords: '基础信息', // 组件关键词，用于搜索
      category: 'base_info', // 组件分类
      props: {
        degree: {
          chName: '学历',
          show: false
        }
      }, // 组件属性
      css: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        height: 250,
        padding: {
          top: 10,
          right: 25,
          bottom: 0,
          left: 25
        }
      }, // 组件样式
      customCss: customCss['BaseInfo_3'],
      dataSource: {}, // 组件单独数据
      customProps: {} // 自定义属性字段
    },
    {
      id: 'BaseInfo_4', // 组件唯一性id
      componentName: 'BaseInfo_4', // 组件名
      commentType: '', // 组件类型
      icon: '', // 组件icon
      title: '基本信息_2', // 组件中文名称
      description: '基本信息模块', // 组件描述信息
      screenShot: {
        width: '100%',
        url: '',
        name: 'BaseInfo_4.png'
      }, // 组件快照
      keywords: '基础信息', // 组件关键词，用于搜索
      category: 'base_info', // 组件分类
      props: {}, // 组件属性
      css: {
        alignItems: 'center',
        height: 200,
        padding: {
          top: 10,
          right: 30,
          bottom: 0,
          left: 30
        }
      }, // 组件样式
      customCss: customCss['BaseInfo_4'],
      dataSource: {}, // 组件单独数据
      customProps: {} // 自定义属性字段
    },
    {
      id: 'BaseInfo_5', // 组件唯一性id
      componentName: 'BaseInfo_5', // 组件名
      commentType: '', // 组件类型
      icon: '', // 组件icon
      title: '基本信息_5', // 组件中文名称
      description: '基本信息模块', // 组件描述信息
      screenShot: {
        width: '100%',
        url: '',
        name: 'BaseInfo_5.png'
      }, // 组件快照
      keywords: '基础信息', // 组件关键词，用于搜索
      category: 'base_info', // 组件分类
      props: {}, // 组件属性
      css: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 265,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        borderWidth: {
          top: 0,
          right: 0,
          bottom: 2,
          left: 0
        }
      }, // 组件样式
      customCss: customCss['BaseInfo_5'],
      dataSource: {}, // 组件单独数据
      customProps: {} // 自定义属性字段
    },
    {
      id: 'BaseInfo_6', // 组件唯一性id
      componentName: 'BaseInfo_6', // 组件名
      commentType: '', // 组件类型
      icon: '', // 组件icon
      title: '基本信息_1', // 组件中文名称
      description: '基本信息模块', // 组件描述信息
      screenShot: {
        width: '',
        url: '',
        name: 'BaseInfo_6.png'
      }, // 组件快照
      keywords: '基础信息', // 组件关键词，用于搜索
      category: 'base_info', // 组件分类
      props: {}, // 组件属性
      css: {
        height: 235,
        alignItems: 'center',
        backgroundPath: 'baseInfo_6.png',
        backgroundRepeat: 'no-repeat',
        padding: {
          top: 0,
          right: 5,
          bottom: 15,
          left: 40
        }
      }, // 组件样式
      customCss: customCss['BaseInfo_6'],
      dataSource: {}, // 组件单独数据
      customProps: {} // 自定义属性字段
    },
    {
      id: 'BaseInfo_7', // 组件唯一性id
      componentName: 'BaseInfo_7', // 组件名
      commentType: '', // 组件类型
      icon: '', // 组件icon
      title: '基本信息_7', // 组件中文名称
      description: '基本信息模块', // 组件描述信息
      screenShot: {
        width: '47%',
        url: '',
        name: 'BaseInfo_7.png'
      }, // 组件快照
      keywords: '基础信息', // 组件关键词，用于搜索
      category: 'base_info', // 组件分类
      props: {}, // 组件属性
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
      customCss: customCss['BaseInfo_7'],
      dataSource: {}, // 组件单独数据
      customProps: {
        // 不需要展示数据配置项
        dataSourceNotShow: {
          name: true,
          abstract: true
        }
      } // 自定义属性字段
    }
  ]
};

export default base_info;
