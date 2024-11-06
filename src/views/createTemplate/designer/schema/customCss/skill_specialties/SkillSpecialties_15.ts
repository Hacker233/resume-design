export default [
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
      margin: {
        top: 0,
        right: 0,
        bottom: 20,
        left: 0
      },
      borderStyle: 'solid',
      borderColor: '#254665',
      background: ''
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
      fontSize: 24,
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
      background: 'rgba(0, 0, 0, 0)'
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
  },
  {
    title: '单个列表样式',
    prop: 'skillSpecialtiesLi',
    css: {
      width: '100%',
      listStyle: 'none',
      listStylePosition: 'outside',
      letterSpacing: 1,
      lineHeight: 2,
      fontSize: 14,
      color: '#fff',
      margin: {
        bottom: 10,
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
  },
  {
    title: '熟练度样式',
    prop: 'elSliderBar',
    css: {
      background: '#4487c6'
    }
  }
];
