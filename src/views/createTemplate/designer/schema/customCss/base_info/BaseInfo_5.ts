export default [
  {
    title: '信息模块样式',
    prop: 'userInfoBlock',
    css: {
      width: '100%',
      height: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundPath: 'baseInfo_5.png',
      backgroundRepeat: 'no-repeat',
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 40
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
      width: 115,
      height: 115,
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
        top: 0,
        right: 40,
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
        topLeft: '50%',
        topRight: '50%',
        bottomLeft: '50%',
        bottomRight: '50%'
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
      color: '#fff',
      fontSize: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
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
      color: '#fff',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
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
    title: '用户基础资料样式',
    prop: 'userBaseInfo',
    css: {
      width: '100%',
      flex: 1,
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
        left: 40
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
