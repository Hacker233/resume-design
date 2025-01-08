export default [
  {
    title: '上部分背景',
    prop: 'topBgcStyle',
    css: {
      width: '100%',
      height: 110,
      background: '#292929',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 0,
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
    title: '信息模块样式',
    prop: 'userInfoBlock',
    css: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      height: 145,
      zIndex: 1,
      padding: {
        top: 0,
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
    title: '姓名简介整体样式',
    prop: 'nameAbstractBox',
    css: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      background: 'none',
      zIndex: 1,
      padding: {
        top: 0,
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
      zIndex: 1,
      padding: {
        top: 0,
        right: 0,
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
      color: '#ffffff',
      fontSize: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 500,
      zIndex: 1,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 8,
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
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 500,
      zIndex: 1,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 35,
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
      zIndex: 1,
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
