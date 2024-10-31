// 配置哪一些属性需要跟随主题色改变
const themeColorProps: any = {
  ResumeTitle_1: {
    css: ['background'], // 主题样式需要设置为主题色的css属性
    customCss: {} // 自定义样式中，需要设置为主题色的prop，以及对应的css属性
  },
  ResumeTitle_2: {
    css: ['background'],
    customCss: {}
  },
  BaseInfo_3: {
    css: [],
    customCss: {
      moduleTitle: ['borderColor']
    }
  },
  JobIntention_1: {
    css: [],
    customCss: {
      moduleTitle: ['color', 'borderColor'],
      moduleTitleFont: ['color', 'borderColor']
    }
  },
  JobIntention_2: {
    css: [],
    customCss: {
      moduleTitle: ['color', 'borderColor'],
      moduleTitleFont: ['color', 'borderColor']
    }
  },
  JobIntention_3: {
    css: [],
    customCss: {
      moduleTitle: ['color', 'borderColor'],
      moduleTitleFont: ['color', 'borderColor'],
      moduleTitleIcon: ['background']
    }
  },
  JobIntention_4: {
    css: [],
    customCss: {
      moduleTitle: ['borderColor']
    }
  },
  JobIntention_5: {
    css: [],
    customCss: {
      moduleTitle: ['borderColor'],
      moduleTitleFontBox: ['background']
    }
  },
  JobIntention_6: {
    css: [],
    customCss: {
      moduleTitle: ['color']
    }
  },
  JobIntention_7: {
    css: [],
    customCss: {
      moduleTitle: ['color']
    }
  },
  JobIntention_8: {
    css: [],
    customCss: {
      moduleTitle: ['borderColor', 'color'],
      moduleTitleIcon: ['background'],
      moduleTitleRightBox: ['borderColor']
    }
  },
  JobIntention_9: {
    css: [],
    customCss: {
      moduleTitle: ['color', 'borderColor'],
      moduleTitleFont: ['color', 'borderColor']
    }
  },
  JobIntention_10: {
    css: [],
    customCss: {
      moduleTitle: ['color']
    }
  },
  EduBackground_1: {
    css: [],
    customCss: {
      moduleTitle: ['color', 'borderColor'],
      moduleTitleFont: ['color', 'borderColor']
    }
  },
  EduBackground_2: {
    css: [],
    customCss: {
      moduleTitle: ['color', 'borderColor'],
      moduleTitleFont: ['color', 'borderColor']
    }
  },
  EduBackground_3: {
    css: [],
    customCss: {
      moduleTitle: ['color', 'borderColor'],
      moduleTitleFont: ['color', 'borderColor'],
      moduleTitleIcon: ['background']
    }
  },
  EduBackground_4: {
    css: [],
    customCss: {
      moduleTitle: ['borderColor']
    }
  },
  EduBackground_5: {
    css: [],
    customCss: {
      moduleTitle: ['borderColor'],
      moduleTitleFontBox: ['background']
    }
  }
};
export default themeColorProps;
