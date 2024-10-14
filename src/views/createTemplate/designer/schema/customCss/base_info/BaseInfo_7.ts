export default [
  {
    title: '信息模块样式',
    prop: 'userInfoBlock',
    css: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flex: 1,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 30
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      background: 'none'
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
      margin: {
        top: 0,
        right: 0,
        bottom: 35,
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
    title: '用户基础资料样式',
    prop: 'userBaseInfo',
    css: {
      height: '100%',
      fontSize: 14,
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      fontWeight: 500,
      letterSpacing: 2,
      lineHeight: 2,
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
  }
];
