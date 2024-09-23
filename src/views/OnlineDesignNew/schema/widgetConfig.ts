import { IWidgetTab } from '../types';

export const WIDGET_CONFIG_LIST: Array<IWidgetTab> = [
  {
    title: '容器',
    category: 'container',
    icon: 'icon-jibenziliao',
    dataSource: {}, // 该分类下公用数据源
    list: [
      {
        id: '', // 组件唯一性id
        componentName: 'container-1', // 组件名
        commentType: 'container', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '容器组件', // 组件描述信息
        screenShot: {
          src: 'avatar-1.png',
          width: '70px',
          height: '90px',
          borderRadius: '10px'
        }, // 组件快照
        keywords: '头像', // 组件关键词，用于搜索
        category: 'container', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 300,
          height: 300,
          rotate: 0, // 旋转角度
          backgroundColor: '#eee',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 0,
          borderColor: '#ccc',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {}, // 组件单独数据
        children: []
      }
    ]
  },
  {
    title: '头像',
    category: 'avatar',
    icon: 'icon-jibenziliao',
    dataSource: {
      avatarSrc: '' // 默认头像地址
    }, // 该分类下公用数据源
    list: [
      {
        id: '', // 组件唯一性id
        componentName: 'hj-avatar-1', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '正方形头像', // 组件描述信息
        screenShot: {
          src: 'avatar-1.png',
          width: '70px',
          height: '90px',
          borderRadius: '10px'
        }, // 组件快照
        keywords: '头像', // 组件关键词，用于搜索
        category: 'avatar-1', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 120,
          height: 150,
          rotate: 0, // 旋转角度
          backgroundColor: '#eee',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 3,
          borderRadius: 10,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-avatar-2', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '圆形头像', // 组件描述信息
        screenShot: {
          src: 'avatar-2.png',
          width: '90px',
          height: '90px',
          borderRadius: '50%'
        }, // 组件快照
        keywords: '头像', // 组件关键词，用于搜索
        category: 'avatar-2', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 120,
          height: 120,
          rotate: 0, // 旋转角度
          backgroundColor: '#eee',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 3,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-avatar-3', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '六边形头像', // 组件描述信息
        screenShot: {
          src: 'avatar-3.png',
          width: '90px',
          height: '90px',
          borderRadius: '10px'
        }, // 组件快照
        keywords: '圆头像', // 组件关键词，用于搜索
        category: 'avatar-3', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 120,
          height: 130,
          rotate: 0, // 旋转角度
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 3,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-avatar-4', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '内置矩形头像', // 组件描述信息
        screenShot: {
          src: 'avatar-4.png',
          width: '75px',
          height: '75px',
          borderRadius: '10px'
        }, // 组件快照
        keywords: '头像', // 组件关键词，用于搜索
        category: 'avatar-4', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 130,
          height: 130,
          rotate: 0, // 旋转角度
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 3,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-avatar-5', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '正五边形头像', // 组件描述信息
        screenShot: {
          src: 'avatar-5.png',
          width: '90px',
          height: '90px',
          borderRadius: '10px'
        }, // 组件快照
        keywords: '头像', // 组件关键词，用于搜索
        category: 'avatar-5', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 120,
          height: 116,
          rotate: 0, // 旋转角度
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 3,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-avatar-6', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '正七边形头像', // 组件描述信息
        screenShot: {
          src: 'avatar-6.png',
          width: '90px',
          height: '90px',
          borderRadius: '10px'
        }, // 组件快照
        keywords: '头像', // 组件关键词，用于搜索
        category: 'avatar-6', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 120,
          height: 120,
          rotate: 0, // 旋转角度
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 3,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      }
    ]
  },
  {
    title: '文本',
    category: 'text',
    icon: 'icon-wenben',
    dataSource: {
      text: '91化简' // 文本内容
    }, // 该分类下公用数据源
    list: [
      {
        id: '', // 组件唯一性id
        componentName: 'hj-text-1', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '文本', // 组件描述信息
        screenShot: {
          src: 'text-1.png',
          width: '116px',
          height: '37px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '文本-1', // 组件关键词，用于搜索
        category: 'text', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 60,
          height: 20,
          rotate: 0, // 旋转角度
          fontSize: 14,
          letterSpace: 1,
          lineHeight: 1.5,
          fontFamily: '方正黑体简体',
          fontWeight: 500,
          textAlign: 'justify',
          fontColor: '#333333',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 10,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-text-2', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '渐变文本-1', // 组件描述信息
        screenShot: {
          src: 'text-2.png',
          width: '116px',
          height: '37px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '文本-2', // 组件关键词，用于搜索
        category: 'text', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 60,
          height: 20,
          rotate: 0, // 旋转角度
          fontSize: 14,
          letterSpace: 1,
          lineHeight: 1.5,
          fontFamily: '方正黑体简体',
          fontWeight: 500,
          textAlign: 'justify',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 10,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-text-3', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '渐变文本-2', // 组件描述信息
        screenShot: {
          src: 'text-3.png',
          width: '116px',
          height: '37px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '文本-3', // 组件关键词，用于搜索
        category: 'text', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 60,
          height: 20,
          rotate: 0, // 旋转角度
          fontSize: 14,
          letterSpace: 1,
          lineHeight: 1.5,
          fontFamily: '方正黑体简体',
          fontWeight: 500,
          textAlign: 'justify',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 10,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-text-4', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '渐变文本-3', // 组件描述信息
        screenShot: {
          src: 'text-4.png',
          width: '116px',
          height: '37px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '文本-4', // 组件关键词，用于搜索
        category: 'text', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 60,
          height: 20,
          rotate: 0, // 旋转角度
          fontSize: 14,
          letterSpace: 1,
          lineHeight: 1.5,
          fontFamily: '方正黑体简体',
          fontWeight: 500,
          textAlign: 'justify',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 10,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-text-5', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '渐变文本-4', // 组件描述信息
        screenShot: {
          src: 'text-5.png',
          width: '116px',
          height: '37px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '文本-5', // 组件关键词，用于搜索
        category: 'text', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 60,
          height: 20,
          rotate: 0, // 旋转角度
          fontSize: 14,
          letterSpace: 1,
          lineHeight: 1.5,
          fontFamily: '方正黑体简体',
          fontWeight: 500,
          textAlign: 'justify',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 10,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-text-6', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '渐变文本-5', // 组件描述信息
        screenShot: {
          src: 'text-6.png',
          width: '116px',
          height: '37px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '文本-6', // 组件关键词，用于搜索
        category: 'text', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 60,
          height: 20,
          rotate: 0, // 旋转角度
          fontSize: 14,
          letterSpace: 1,
          lineHeight: 1.5,
          fontFamily: '方正黑体简体',
          fontWeight: 500,
          textAlign: 'justify',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 10,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-text-7', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '渐变文本-6', // 组件描述信息
        screenShot: {
          src: 'text-7.png',
          width: '116px',
          height: '37px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '文本-7', // 组件关键词，用于搜索
        category: 'text', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 60,
          height: 20,
          rotate: 0, // 旋转角度
          fontSize: 14,
          letterSpace: 1,
          lineHeight: 1.5,
          fontFamily: '方正黑体简体',
          fontWeight: 500,
          textAlign: 'justify',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 10,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-text-8', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '渐变文本-7', // 组件描述信息
        screenShot: {
          src: 'text-8.png',
          width: '116px',
          height: '37px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '文本-8', // 组件关键词，用于搜索
        category: 'text', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 60,
          height: 20,
          rotate: 0, // 旋转角度
          fontSize: 14,
          letterSpace: 1,
          lineHeight: 1.5,
          fontFamily: '方正黑体简体',
          fontWeight: 500,
          textAlign: 'justify',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 10,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-text-9', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '渐变文本-8', // 组件描述信息
        screenShot: {
          src: 'text-9.png',
          width: '116px',
          height: '37px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '文本-9', // 组件关键词，用于搜索
        category: 'text', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 60,
          height: 20,
          rotate: 0, // 旋转角度
          fontSize: 14,
          letterSpace: 1,
          lineHeight: 1.5,
          fontFamily: '方正黑体简体',
          fontWeight: 500,
          textAlign: 'justify',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 10,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-text-10', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '渐变文本-9', // 组件描述信息
        screenShot: {
          src: 'text-10.png',
          width: '116px',
          height: '37px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '文本-10', // 组件关键词，用于搜索
        category: 'text', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 60,
          height: 20,
          rotate: 0, // 旋转角度
          fontSize: 14,
          letterSpace: 1,
          lineHeight: 1.5,
          fontFamily: '方正黑体简体',
          fontWeight: 500,
          textAlign: 'justify',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 10,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      }
    ]
  },
  {
    title: '形状',
    category: 'shape',
    icon: 'icon-xingzhuang-xingxing',
    dataSource: {},
    list: [
      {
        id: '', // 组件唯一性id
        componentName: 'hj-square', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '正方形', // 组件描述信息
        screenShot: {
          src: 'square.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '正方形', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 1,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-rectangle', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '长方形', // 组件描述信息
        screenShot: {
          src: 'rectangle.png',
          width: '100px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '长方形', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 50,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 1,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-circle', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '长方形', // 组件描述信息
        screenShot: {
          src: 'circle.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '圆形', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-oval', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '椭圆形', // 组件描述信息
        screenShot: {
          src: 'oval.png',
          width: '100px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '椭圆形', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 50,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-triangle', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '三角形', // 组件描述信息
        screenShot: {
          src: 'triangle.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '三角形', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-trapezoid', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '梯形', // 组件描述信息
        screenShot: {
          src: 'trapezoid.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '梯形', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-parallelogram', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '平行四边形', // 组件描述信息
        screenShot: {
          src: 'parallelogram.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '平行四边形', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-rhombus', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '菱形', // 组件描述信息
        screenShot: {
          src: 'rhombus.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '菱形', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-pentagon', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '五边形', // 组件描述信息
        screenShot: {
          src: 'pentagon.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '五边形', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-hexagon', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '六边形', // 组件描述信息
        screenShot: {
          src: 'hexagon.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '六边形', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-heptagon', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '七边形', // 组件描述信息
        screenShot: {
          src: 'heptagon.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '七边形', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-octagon', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '八边形', // 组件描述信息
        screenShot: {
          src: 'octagon.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '八边形', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-nonagon', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '九边形', // 组件描述信息
        screenShot: {
          src: 'nonagon.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '九边形', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-decagon', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '十边形', // 组件描述信息
        screenShot: {
          src: 'decagon.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '十边形', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-bevel', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '斜角', // 组件描述信息
        screenShot: {
          src: 'bevel.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '斜角', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-rabbet', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '槽口', // 组件描述信息
        screenShot: {
          src: 'rabbet.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '槽口', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-leftArrow', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '左箭头', // 组件描述信息
        screenShot: {
          src: 'leftArrow.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '左箭头', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-rightArrow', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '右箭头', // 组件描述信息
        screenShot: {
          src: 'rightArrow.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '右箭头', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-leftPoint', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '左点', // 组件描述信息
        screenShot: {
          src: 'leftPoint.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '左点', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-rightPoint', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '右点', // 组件描述信息
        screenShot: {
          src: 'rightPoint.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '右点', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-leftChevron', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '左雪佛龙', // 组件描述信息
        screenShot: {
          src: 'leftChevron.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '左雪佛龙', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-rightChevron', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '右雪佛龙', // 组件描述信息
        screenShot: {
          src: 'rightChevron.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '右雪佛龙', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-star', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '五角星', // 组件描述信息
        screenShot: {
          src: 'star.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '五角星', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-cross', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '十字架', // 组件描述信息
        screenShot: {
          src: 'cross.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '十字架', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-message', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '消息框', // 组件描述信息
        screenShot: {
          src: 'message.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '消息框', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-close', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '关闭', // 组件描述信息
        screenShot: {
          src: 'close.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '关闭', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-frame', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '容器', // 组件描述信息
        screenShot: {
          src: 'frame.png',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '容器', // 组件关键词，用于搜索
        category: 'shape', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 100,
          height: 100,
          rotate: 0, // 旋转角度
          backgroundColor: '#74a274',
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      }
    ]
  },
  {
    title: '评分',
    category: 'rate',
    icon: 'icon-dengji1',
    dataSource: {
      rateValue: 3 // 评级
    },
    list: [
      {
        id: '', // 组件唯一性id
        componentName: 'hj-rate-1', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '五星评级', // 组件描述信息
        screenShot: {
          src: 'hj-rate-1.png',
          width: '120px',
          height: '35px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '五星评级', // 组件关键词，用于搜索
        category: 'rate', // 组件分类
        props: {
          voidColor: '#C6D1DE', // 未选中图标的颜色
          activeColor: '#f7ba2a', // 选中时的颜色
          showText: false, // 是否显示辅助文字
          aidedTextColor: '#1F2D3D' // 辅助文字颜色
        }, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 170,
          height: 26,
          rateSize: 20,
          rotate: 0, // 旋转角度
          backgroundColor: '',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-rate-2', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '进度条', // 组件描述信息
        screenShot: {
          src: 'hj-rate-2.png',
          width: '120px',
          height: '35px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '进度条', // 组件关键词，用于搜索
        category: 'rate', // 组件分类
        props: {
          rateHeight: 10, // 进度条高度
          activeColor: '#f7ba2a', // 选中时的颜色
          showText: false, // 是否显示辅助文字
          aidedTextColor: '#1F2D3D' // 辅助文字颜色
        }, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 220,
          height: 15,
          rotate: 0, // 旋转角度
          fontSize: 14,
          letterSpace: 1,
          backgroundColor: '',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-rate-3', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '环形', // 组件描述信息
        screenShot: {
          src: 'hj-rate-3.png',
          width: '110px',
          height: '100px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '环形', // 组件关键词，用于搜索
        category: 'rate', // 组件分类
        props: {
          rateHeight: 10, // 进度条高度
          activeColor: '#f7ba2a', // 选中时的颜色
          showText: false, // 是否显示辅助文字
          aidedTextColor: '#1F2D3D' // 辅助文字颜色
        }, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 130,
          height: 130,
          rotate: 0, // 旋转角度
          fontSize: 14,
          letterSpace: 1,
          backgroundColor: '',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-rate-4', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '仪表盘', // 组件描述信息
        screenShot: {
          src: 'hj-rate-4.png',
          width: '115px',
          height: '100px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '仪表盘', // 组件关键词，用于搜索
        category: 'rate', // 组件分类
        props: {
          rateHeight: 10, // 进度条高度
          activeColor: '#f7ba2a', // 选中时的颜色
          showText: false, // 是否显示辅助文字
          aidedTextColor: '#1F2D3D' // 辅助文字颜色
        }, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 130,
          height: 130,
          rotate: 0, // 旋转角度
          fontSize: 14,
          letterSpace: 1,
          backgroundColor: '',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-rate-5', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '步骤', // 组件描述信息
        screenShot: {
          src: 'hj-rate-5.png',
          width: '140px',
          height: '30px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '步骤', // 组件关键词，用于搜索
        category: 'rate', // 组件分类
        props: {
          rateHeight: 7, // 进度条高度
          activeColor: '#f7ba2a', // 选中时的颜色
          showText: false // 是否显示辅助文字
        }, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 200,
          height: 30,
          rotate: 0, // 旋转角度
          fontSize: 14,
          letterSpace: 1,
          backgroundColor: '',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderRadius: 2,
          borderWidth: 0,
          borderColor: '#eee'
        }, // 组件样式
        dataSource: {} // 组件单独数据
      }
    ]
  },
  {
    title: '日期',
    category: 'date',
    icon: 'icon-riqi',
    dataSource: {},
    list: [
      {
        id: '', // 组件唯一性id
        componentName: 'hj-date-1', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '年', // 组件描述信息
        screenShot: {
          src: 'hj-date-1.png',
          width: '60px',
          height: '30px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '年', // 组件关键词，用于搜索
        category: 'rate', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 130,
          height: 30,
          rotate: 0, // 旋转角度
          fontSize: 16,
          letterSpace: 1,
          lineHeight: 1.5,
          fontFamily: '方正黑体简体',
          fontWeight: 600,
          textAlign: 'justify',
          fontColor: '#333333',
          backgroundColor: '',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 0,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {
          year: '2023'
        } // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-date-3', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '日', // 组件描述信息
        screenShot: {
          src: 'hj-date-3.png',
          width: '115px',
          height: '28px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '日', // 组件关键词，用于搜索
        category: 'rate', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 130,
          height: 30,
          rotate: 0, // 旋转角度
          fontSize: 16,
          letterSpace: 1,
          lineHeight: 1.5,
          fontFamily: '方正黑体简体',
          fontWeight: 600,
          textAlign: 'justify',
          fontColor: '#333333',
          backgroundColor: '',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 0,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {
          day: '2023.05.12'
        } // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-date-2', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '月', // 组件描述信息
        screenShot: {
          src: 'hj-date-2.png',
          width: '83px',
          height: '29px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '月', // 组件关键词，用于搜索
        category: 'rate', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 130,
          height: 30,
          rotate: 0, // 旋转角度
          fontSize: 16,
          letterSpace: 1,
          lineHeight: 1.5,
          fontFamily: '方正黑体简体',
          fontWeight: 600,
          textAlign: 'justify',
          fontColor: '#333333',
          backgroundColor: '',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 0,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {
          month: '2023.05'
        } // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-date-4', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '月份范围', // 组件描述信息
        screenShot: {
          src: 'hj-date-4.png',
          width: '160px',
          height: '30px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '月份范围', // 组件关键词，用于搜索
        category: 'rate', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 160,
          height: 30,
          rotate: 0, // 旋转角度
          fontSize: 16,
          letterSpace: 1,
          lineHeight: 1.5,
          fontFamily: '方正黑体简体',
          fontWeight: 600,
          textAlign: 'justify',
          fontColor: '#333333',
          backgroundColor: '',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 0,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {
          monthRange: ['2023.05', '2024.05']
        } // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-date-5', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '日期范围', // 组件描述信息
        screenShot: {
          src: 'hj-date-5.png',
          width: '200px',
          height: '30px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '日期范围', // 组件关键词，用于搜索
        category: 'rate', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 190,
          height: 30,
          rotate: 0, // 旋转角度
          fontSize: 16,
          letterSpace: 1,
          lineHeight: 1.5,
          fontFamily: '方正黑体简体',
          fontWeight: 600,
          textAlign: 'justify',
          fontColor: '#333333',
          backgroundColor: '',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 0,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {
          dateRange: ['2023.05.12', '2024.05.12']
        } // 组件单独数据
      }
    ]
  },
  {
    title: '图片',
    category: 'image',
    icon: 'icon-beijingshuju',
    dataSource: {
      imgUrl: ''
    },
    list: []
  },
  {
    title: '图标',
    category: 'icon',
    icon: 'icon-xingquaihao',
    dataSource: {},
    list: []
  },
  {
    title: '列表',
    category: 'li',
    icon: 'icon-danlieliebiao',
    dataSource: {},
    list: []
  },
  {
    title: '其他',
    category: 'other',
    icon: 'icon-zuopin1',
    dataSource: {},
    list: [
      {
        id: '', // 组件唯一性id
        componentName: 'hj-other-1', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '图标文字', // 组件描述信息
        screenShot: {
          src: 'hj-other-1.png',
          width: '114px',
          height: '40px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '图标文字', // 组件关键词，用于搜索
        category: 'other', // 组件分类
        props: {
          icon: 'icon-wangzhan'
        }, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 95,
          height: 30,
          rotate: 0, // 旋转角度
          fontSize: 16,
          iconSize: 16,
          letterSpace: 1,
          fontFamily: '方正黑体简体',
          fontWeight: 500,
          fontColor: '#333333',
          iconColor: '#74a274',
          backgroundColor: '',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidth: 0,
          borderRadius: 0,
          borderColor: '#eee',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {
          text: '期望薪酬'
        } // 组件单独数据
      },
      {
        id: '', // 组件唯一性id
        componentName: 'hj-other-2', // 组件名
        commentType: '', // 组件类型
        icon: '', // 组件icon
        title: '', // 组件中文名称
        description: '边框文本', // 组件描述信息
        screenShot: {
          src: 'other-2.png',
          width: '116px',
          height: '32px',
          borderRadius: '4px'
        }, // 组件快照
        keywords: '边框文本', // 组件关键词，用于搜索
        category: 'text', // 组件分类
        props: {}, // 组件属性
        css: {
          left: 0,
          top: 0,
          zIndex: 1,
          width: 60,
          height: 14,
          rotate: 0, // 旋转角度
          fontSize: 14,
          letterSpace: 1,
          lineHeight: 1,
          fontFamily: '方正黑体简体',
          fontWeight: 500,
          textAlign: 'justify',
          fontColor: '#666',
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          borderWidthProps: {
            top: 0,
            right: 4,
            bottom: 0,
            left: 0
          },
          borderRadius: 0,
          borderColor: '#a2a2a2',
          borderStyle: 'solid'
        }, // 组件样式
        dataSource: {
          text: '91化简'
        } // 组件单独数据
      }
    ]
  }
];
