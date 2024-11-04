import { cloneDeep } from 'lodash';
import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import SkillSpecialties_1 from './SkillSpecialties_1';
import SkillSpecialties_2 from './SkillSpecialties_2';
import SkillSpecialties_3 from './SkillSpecialties_3';

const resume_title = {
  id: 'skillSpecialties', // 模块id
  moduleChName: '技能特长', // 模块中文名
  category: 'skillSpecialties', // 模块分了
  icon: 'icon-title', // 模块图标
  props: commonProps['skillSpecialties'], // 公共的props
  dataSource: cloneDeep(commonDataSource['skill_specialties']), // 该分类下公用数据源
  css: commonCss['skillSpecialties'], // 公共css属性
  list: [SkillSpecialties_1, SkillSpecialties_2, SkillSpecialties_3]
};

export default resume_title;
