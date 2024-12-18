export default [
  {
    title: '模块标题整体样式',
    prop: 'moduleTitle',
    css: {
      height: '32px',
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
        bottom: 15,
        left: 0
      },
      padding: {
        top: 0,
        right: -1,
        bottom: 0,
        left: 0
      },
      borderStyle: 'solid',
      background: '#f3f3f3',
      borderColor: '#5974D4',
      color: 'rgb(255, 255, 255)'
    }
  },
  {
    title: '模块标题字体样式',
    prop: 'moduleTitleFont',
    css: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: 2,
      background: '#5974D4',
      color: '#fff',
      position: 'relative',
      borderWidth: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      padding: {
        top: 0,
        right: 20,
        bottom: 0,
        left: 50
      },
      borderColor: 'rgb(0, 0, 0)',
      borderStyle: 'solid'
    }
  }
];
