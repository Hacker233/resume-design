import customCss from '../../customCss';

export default {
  id: 'SkillSpecialties_15', // 组件唯一性id
  componentName: 'SkillSpecialties_15', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '技能特长', // 组件中文名称
  description: '技能特长模块', // 组件描述信息
  screenShot: {
    width: '47%',
    url: '',
    name: 'SkillSpecialties_15.png'
  }, // 组件快照
  keywords: '简历标题', // 组件关键词，用于搜索
  category: 'skill_specialties', // 组件分类
  props: {
    title: {
      chName: '技能特长',
      show: true,
      iconfont: 'icon-zhuanyezhishijineng',
      config: true // 是否支持配置
    },
    introduce: {
      chName: '技能介绍',
      show: false,
      iconfont: '',
      config: false
    }
  }, // 组件属性
  css: {
    themeColor: '#254665',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    background: 'none',
    padding: {
      top: 13,
      right: 30,
      bottom: 20,
      left: 30
    }
  }, // 组件样式
  customCss: customCss['SkillSpecialties_15'],
  dataSource: {}, // 组件单独数据
  customProps: {
    ModuleTitleCpt: 'ModuleTitle_13'
  } // 自定义属性字段
};
