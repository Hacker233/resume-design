export default [
  {
    title: '第一根线条样式',
    prop: 'firstLine',
    css: {
      width: '100%',
      height: 10,
      background: '#000000',
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 3,
        left: 0
      }
    }
  },
  {
    title: '第二根线条样式',
    prop: 'secondLine',
    css: {
      width: '100%',
      height: 2,
      background: '#000000',
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
      }
    }
  },
  {
    title: '左侧上方块',
    prop: 'leftTopBox',
    css: {
      width: 40,
      height: '100%',
      background: '#048bb3',
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 5,
        left: 25
      }
    }
  },
  {
    title: '左侧下方块',
    prop: 'leftBottomBox',
    css: {
      width: 40,
      height: '16px',
      background: '#000000',
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 10,
        left: 25
      },
      borderRadius: {
        topLeft: 0,
        topRight: 0,
        bottomLeft: 10,
        bottomRight: 10
      }
    }
  },
  {
    title: '信息模块样式',
    prop: 'userInfoBlock',
    css: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      background: 'rgba(255, 255, 255, 0.63)',
      height: 145,
      padding: {
        top: 5,
        right: 0,
        bottom: 0,
        left: 0
      },
      margin: {
        top: 0,
        right: 20,
        bottom: 0,
        left: 20
      }
    }
  },
  {
    title: '姓名简介整体样式',
    prop: 'nameAbstractBox',
    css: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      background: 'none',
      padding: {
        top: 10,
        right: 0,
        bottom: 0,
        left: 0
      },
      margin: {
        top: 0,
        right: 20,
        bottom: 0,
        left: 0
      }
    }
  },
  {
    title: '头像样式',
    prop: 'avatar',
    css: {
      width: 120,
      height: 150,
      rotate: 0,
      flexShrink: 0,
      backgroundColor: '#eee',
      opacity: 1,
      objectFit: 'fill',
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      margin: {
        top: 20,
        right: 20,
        bottom: 0,
        left: 0
      },
      borderWidth: {
        top: 3,
        right: 3,
        bottom: 3,
        left: 3
      },
      borderRadius: {
        topLeft: 0,
        topRight: 0,
        bottomLeft: 0,
        bottomRight: 0
      },
      borderColor: '#eee',
      borderStyle: 'solid',
      alignItems: 'center',
      justifyContent: 'center',
      background: ''
    }
  },
  {
    title: '姓名样式',
    prop: 'name',
    css: {
      color: '#747474',
      fontSize: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 500,
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
      background: ''
    }
  },
  {
    title: '简介样式',
    prop: 'abstract',
    css: {
      fontSize: 14,
      color: '#747474',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 500,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      margin: {
        top: 15,
        right: 0,
        bottom: 15,
        left: 0
      },
      background: ''
    }
  },
  {
    title: '用户基础资料样式',
    prop: 'userBaseInfo',
    css: {
      flex: 1,
      fontSize: 14,
      color: '#747474',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      fontWeight: 500,
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
      background: ''
    }
  }
];
