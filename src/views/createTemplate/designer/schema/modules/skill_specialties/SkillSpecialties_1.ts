import customCss from '../../customCss';

export default {
  id: 'SkillSpecialties_1', // 组件唯一性id
  componentName: 'SkillSpecialties_1', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '技能特长', // 组件中文名称
  description: '技能特长模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'SkillSpecialties_1.png'
  }, // 组件快照
  keywords: '简历标题', // 组件关键词，用于搜索
  category: 'skill_specialties', // 组件分类
  props: {
    skillName: {
      chName: '技能名称',
      show: false,
      iconfont: '',
      config: false
    },
    proficiency: {
      chName: '熟练度',
      show: false,
      iconfont: '',
      config: false
    }
  }, // 组件属性
  css: {
    themeColor: '#254665',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: {
      top: 0,
      right: 40,
      bottom: 20,
      left: 40
    }
  }, // 组件样式
  customCss: customCss['SkillSpecialties_1'],
  dataSource: {}, // 组件单独数据
  customProps: {
    ModuleTitleCpt: 'ModuleTitle_3'
  } // 自定义属性字段
};
