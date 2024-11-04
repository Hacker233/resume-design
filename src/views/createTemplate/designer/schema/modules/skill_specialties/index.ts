import { cloneDeep } from 'lodash';
import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import SkillSpecialties_1 from './SkillSpecialties_1.vue';

const resume_title = {
  id: 'skillSpecialties', // 模块id
  moduleChName: '技能特长', // 模块中文名
  category: 'resumeTitle', // 模块分了
  icon: 'icon-title', // 模块图标
  props: commonProps['skillSpecialties'], // 公共的props
  dataSource: cloneDeep(commonDataSource['skill_specialties']), // 该分类下公用数据源
  css: commonCss['resumeTitle'], // 公共css属性
  list: [SkillSpecialties_1]
};

export default resume_title;
