import { cloneDeep } from 'lodash';
import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import InternshipExperience_1 from './InternshipExperience_1';
import InternshipExperience_2 from './InternshipExperience_2';
import InternshipExperience_3 from './InternshipExperience_3';
import InternshipExperience_4 from './InternshipExperience_4';
import InternshipExperience_5 from './InternshipExperience_5';
import InternshipExperience_6 from './InternshipExperience_6';
import InternshipExperience_7 from './InternshipExperience_7';
import InternshipExperience_8 from './InternshipExperience_8';
import InternshipExperience_9 from './InternshipExperience_9';
import InternshipExperience_10 from './InternshipExperience_10';
import InternshipExperience_11 from './InternshipExperience_11';

const internship_experience = {
  id: 'internshipExperience', // 模块id
  moduleChName: '实习经验', // 模块中文名
  category: 'internshipExperience', // 模块分了
  icon: 'icon-shixi1', // 模块图标
  props: commonProps['internshipExperience'], // 公共的props
  dataSource: cloneDeep(commonDataSource['internship_experience']), // 该分类下公用数据源
  css: commonCss['internship_experience'],
  list: [
    InternshipExperience_1,
    InternshipExperience_2,
    InternshipExperience_3,
    InternshipExperience_4,
    InternshipExperience_5,
    InternshipExperience_6,
    InternshipExperience_7,
    InternshipExperience_8,
    InternshipExperience_9,
    InternshipExperience_10,
    InternshipExperience_11
  ]
};

export default internship_experience;
