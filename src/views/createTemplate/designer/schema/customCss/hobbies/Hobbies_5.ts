export default [
  {
    title: '模块标题整体样式',
    prop: 'moduleTitle',
    css: {
      width: '100%',
      height: '35px',
      display: 'flex',
      alignItems: 'center',
      borderWidth: {
        top: 0,
        right: 0,
        bottom: 1,
        left: 0
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      borderStyle: 'solid',
      borderColor: '#da180f',
      background: ''
    }
  },
  {
    title: '模块标题样式',
    prop: 'moduleTitleFontBox',
    css: {
      height: '100%',
      background: '#da180f',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: {
        top: 0,
        right: 25,
        bottom: 0,
        left: 35
      }
    }
  },
  {
    title: '模块标题字体样式',
    prop: 'moduleTitleFont',
    css: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 500,
      letterSpacing: 2,
      background: ''
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
        left: 0
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
