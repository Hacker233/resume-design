export default [
  {
    title: '模块标题整体样式',
    prop: 'moduleTitle',
    css: {
      height: 22,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderWidth: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 20,
        left: 0
      },
      borderColor: 'rgb(37, 70, 101)',
      borderStyle: 'solid',
      background: 'none',
      color: 'rgb(37, 70, 101)'
    }
  },
  {
    title: '模块标题字体样式',
    prop: 'moduleTitleFont',
    css: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: 2,
      background: 'none',
      color: '#079cfa',
      borderWidth: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      borderStyle: 'solid'
    }
  },
  {
    title: '模块标题图标样式',
    prop: 'moduleTitleIcon',
    css: {
      height: 26,
      width: 26,
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      color: '#fff',
      margin: {
        top: 4,
        right: 10,
        bottom: 0,
        left: 0
      },
      borderWidth: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      borderRadius: {
        topLeft: '50%',
        topRight: '50%',
        bottomLeft: '50%',
        bottomRight: '50%'
      },
      borderStyle: 'solid',
      background: '#079cfa'
    }
  },
  {
    title: '爱好简介样式',
    prop: 'abstract',
    css: {
      width: '100%',
      fontSize: 14,
      color: '#7c7b7b',
      textAlign: 'justify',
      lineHeight: 1.5,
      fontWeight: 500,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 25
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 20,
        left: 0
      }
    }
  }
];
