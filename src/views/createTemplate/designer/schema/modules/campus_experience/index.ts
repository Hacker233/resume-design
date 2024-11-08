import { cloneDeep } from 'lodash';
import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import CampusExperience_1 from './CampusExperience_1';
import CampusExperience_2 from './CampusExperience_2';
import CampusExperience_3 from './CampusExperience_3';
import CampusExperience_4 from './CampusExperience_4';
import CampusExperience_5 from './CampusExperience_5';
import CampusExperience_6 from './CampusExperience_6';
import CampusExperience_7 from './CampusExperience_7';
import CampusExperience_8 from './CampusExperience_8';
import CampusExperience_9 from './CampusExperience_9';
import CampusExperience_10 from './CampusExperience_10';
import CampusExperience_11 from './CampusExperience_11';

const base_info = {
  id: 'campusExperience', // 模块id
  moduleChName: '校园经历', // 模块中文名
  category: 'campusExperience', // 模块分了
  icon: 'icon-xiaoyuan', // 模块图标
  props: commonProps['campusExperience'], // 公共的props
  dataSource: cloneDeep(commonDataSource['campus_experience']), // 该分类下公用数据源
  css: commonCss['campus_experience'],
  list: [
    CampusExperience_1,
    CampusExperience_2,
    CampusExperience_3,
    CampusExperience_4,
    CampusExperience_5,
    CampusExperience_6,
    CampusExperience_7,
    CampusExperience_8,
    CampusExperience_9,
    CampusExperience_10,
    CampusExperience_11
  ]
};

export default base_info;
