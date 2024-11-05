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
      margin: {
        top: 0,
        right: 0,
        bottom: 15,
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
    title: '技能特长整体样式',
    prop: 'skillSpecialtiesBox',
    css: {
      width: '100%',
      color: '#757575',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 10
      },
      padding: {
        bottom: 0,
        left: 60,
        right: 0,
        top: 0
      },
      background: ''
    }
  },
  {
    title: '单个列表样式',
    prop: 'skillSpecialtiesLi',
    css: {
      width: '100%',
      listStyle: 'disc',
      listStylePosition: 'outside',
      letterSpacing: 1,
      lineHeight: 2,
      fontSize: 14,
      margin: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
      },
      padding: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
      },
      background: ''
    }
  }
];
