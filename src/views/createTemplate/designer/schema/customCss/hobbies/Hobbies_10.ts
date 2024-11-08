export default [
  {
    title: '模块标题整体样式',
    prop: 'moduleTitle',
    css: {
      height: 40,
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
      borderStyle: 'solid',
      background: 'none',
      borderColor: '#254665',
      color: '#fff',
      backgroundPath: 'title_bg.png', // 背景图片地址
      backgroundRepeat: 'no-repeat'
    }
  },
  {
    title: '模块标题字体样式',
    prop: 'moduleTitleFont',
    css: {
      height: '100%',
      width: 150,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: 2,
      background: 'none',
      borderWidth: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
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
      borderColor: 'rgb(0, 0, 0)',
      borderStyle: 'solid'
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
