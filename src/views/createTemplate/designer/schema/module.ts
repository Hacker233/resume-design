import { IModulesList } from '../../types/IHJNewSchema';

const modulesList: IModulesList = {
  resume_title: {
    id: 'resumeTitle', // 模块id
    moduleChName: '简历标题', // 模块中文名
    category: 'resumeTitle', // 模块分了
    icon: 'icon-title', // 模块图标
    props: {
      title: true
    }, // 公共的props
    dataSource: {
      title: '我的简历'
    }, // 该分类下公用数据源
    css: {
      width: 820,
      height: 300,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      background: '#fff',
      fontSize: '16px',
      fontWeight: 400,
      fontFamily: '微软雅黑',
      color: '#fff',
      letterSpacing: 0,
      opacity: 1,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      borderWidth: 0,
      borderRadius: 0,
      borderColor: '#eee',
      borderStyle: 'solid'
    }, // 公共css属性
    list: [
      {
        id: 'ResumeTitle_1', // 组件唯一性id
        componentName: 'ResumeTitle_1', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '简历标题_1', // 组件中文名称
        description: '简历标题模块', // 组件描述信息
        screenShot: {
          width: '100%',
          url: '',
          name: 'ResumeTitle_1.png'
        }, // 组件快照
        keywords: '简历标题', // 组件关键词，用于搜索
        category: 'resume_title', // 组件分类
        props: {}, // 组件属性
        css: {
          height: 32,
          background: '#000',
          color: '#fff',
          margin: {
            bottom: 10,
            left: 0,
            right: 0,
            top: 10
          }
        }, // 组件样式
        customCss: [
          {
            title: '内置方块样式',
            prop: 'custom_css_1',
            css: {
              width: 36,
              background: '#258bb1',
              margin: {
                bottom: 0,
                left: 0,
                right: 18,
                top: 0
              }
            }
          }
        ],
        dataSource: {}, // 组件单独数据
        customProps: {} // 自定义属性字段
      },
      {
        id: 'ResumeTitle_2', // 组件唯一性id
        componentName: 'ResumeTitle_2', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '简历标题_2', // 组件中文名称
        description: '简历标题模块', // 组件描述信息
        screenShot: {
          width: '',
          url: '',
          name: 'ResumeTitle_2.png'
        }, // 组件快照
        keywords: '简历标题', // 组件关键词，用于搜索
        category: 'resume_title', // 组件分类
        props: {}, // 组件属性
        css: {
          height: 32,
          background: '#000',
          color: '#fff',
          margin: {
            bottom: 10,
            left: 0,
            right: 0,
            top: 10
          },
          padding: {
            bottom: 0,
            left: 0,
            right: 90,
            top: 0
          },
          justifyContent: 'flex-end'
        }, // 组件样式
        customCss: [
          {
            title: '内置方块样式',
            prop: 'custom_css_1',
            css: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              background: '#ff9916',
              padding: {
                bottom: 0,
                left: 15,
                right: 15,
                top: 0
              }
            }
          }
        ],
        dataSource: {}, // 组件单独数据
        customProps: {} // 自定义属性字段
      }
    ]
  },
  base_info: {
    id: 'baseInfo', // 模块id
    moduleChName: '基本资料', // 模块中文名
    category: 'baseInfo', // 模块分了
    icon: 'icon-jichuxinxi', // 模块图标
    props: {}, // 公共的props
    dataSource: {}, // 该分类下公用数据源
    css: {},
    list: []
  }
};

export default modulesList;
