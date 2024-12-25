import { cloneDeep } from 'lodash';
import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import SkillSpecialties_1 from './SkillSpecialties_1';
import SkillSpecialties_2 from './SkillSpecialties_2';
import SkillSpecialties_3 from './SkillSpecialties_3';
import SkillSpecialties_4 from './SkillSpecialties_4';
import SkillSpecialties_5 from './SkillSpecialties_5';
import SkillSpecialties_6 from './SkillSpecialties_6';
import SkillSpecialties_7 from './SkillSpecialties_7';
import SkillSpecialties_8 from './SkillSpecialties_8';
import SkillSpecialties_9 from './SkillSpecialties_9';
import SkillSpecialties_10 from './SkillSpecialties_10';
import SkillSpecialties_11 from './SkillSpecialties_11';
import SkillSpecialties_12 from './SkillSpecialties_12';
import SkillSpecialties_13 from './SkillSpecialties_13';
import SkillSpecialties_14 from './SkillSpecialties_14';
import SkillSpecialties_15 from './SkillSpecialties_15';
import SkillSpecialties_16 from './SkillSpecialties_16';

const skill_specialties = {
  id: 'skillSpecialties', // 模块id
  moduleChName: '技能特长', // 模块中文名
  category: 'skill_specialties', // 模块分了
  icon: 'icon-yuzhijineng', // 模块图标
  props: commonProps['skillSpecialties'], // 公共的props
  dataSource: cloneDeep(commonDataSource['skill_specialties']), // 该分类下公用数据源
  css: commonCss['skillSpecialties'], // 公共css属性
  list: [
    SkillSpecialties_1,
    SkillSpecialties_2,
    SkillSpecialties_3,
    SkillSpecialties_4,
    SkillSpecialties_5,
    SkillSpecialties_6,
    SkillSpecialties_7,
    SkillSpecialties_8,
    SkillSpecialties_9,
    SkillSpecialties_10,
    SkillSpecialties_11,
    SkillSpecialties_12,
    SkillSpecialties_13,
    SkillSpecialties_14,
    SkillSpecialties_15,
    SkillSpecialties_16
  ]
};

export default skill_specialties;
