export default [
  {
    title: '模块标题整体样式',
    prop: 'moduleTitle',
    css: {
      height: '40px',
      width: '100%',
      display: 'flex',
      alignItems: 'end',
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
      borderColor: '#5974D4',
      color: 'rgb(255, 255, 255)'
    }
  },
  {
    title: '模块标题右侧线条样式',
    prop: 'moduleTitleRightLine',
    css: {
      height: '20px',
      flex: 1,
      borderWidth: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: -12
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      borderStyle: 'solid',
      background: '#e5e5e5',
      borderColor: '#5974D4'
    }
  },
  {
    title: '模块标题字体样式',
    prop: 'moduleTitleFont',
    css: {
      height: '100%',
      width: '130px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: 2,
      background: '#555555',
      color: '#fff',
      borderWidth: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      borderColor: 'rgb(0, 0, 0)',
      borderStyle: 'solid'
    }
  }
];
