export default [
  {
    title: '信息模块样式',
    prop: 'userInfoBlock',
    css: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
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
    title: '信息模块和头像整体样式',
    prop: 'userInfoAvatar',
    css: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      padding: {
        top: 30,
        right: 20,
        bottom: 0,
        left: 50
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
    title: '头像样式',
    prop: 'avatar',
    css: {
      width: 120,
      height: 150,
      rotate: 0,
      flexShrink: 0,
      backgroundColor: '#eee',
      opacity: 1,
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
      justifyContent: 'center'
    }
  },
  {
    title: '姓名样式',
    prop: 'name',
    css: {
      color: '#254665',
      fontSize: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 500,
      padding: {
        top: 0,
        right: 0,
        bottom: 5,
        left: 0
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 8,
        left: 0
      }
    }
  },
  {
    title: '简介样式',
    prop: 'abstract',
    css: {
      fontSize: 14,
      color: '#757575',
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
        top: 0,
        right: 0,
        bottom: 30,
        left: 0
      }
    }
  },
  {
    title: '用户基础资料样式',
    prop: 'userBaseInfo',
    css: {
      height: '15px',
      fontSize: 14,
      color: '#7c7b7b',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
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
      }
    }
  },
  {
    title: '模块标题整体样式',
    prop: 'moduleTitle',
    css: {
      width: '100%',
      height: 30,
      display: 'flex',
      alignItems: 'center',
      borderWidth: {
        top: 0,
        right: 0,
        bottom: 1,
        left: 0
      },
      borderStyle: 'solid',
      themeColor: '#254665'
    }
  },
  {
    title: '模块标题字体样式',
    prop: 'moduleTitleFont',
    css: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 500,
      letterSpacing: 2
    }
  }
];
