import { cloneDeep } from 'lodash';
import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import WorkExperience_1 from './WorkExperience_1';
import WorkExperience_2 from './WorkExperience_2';
import WorkExperience_3 from './WorkExperience_3';
import WorkExperience_4 from './WorkExperience_4';
import WorkExperience_5 from './WorkExperience_5';
import WorkExperience_6 from './WorkExperience_6';
import WorkExperience_7 from './WorkExperience_7';
import WorkExperience_8 from './WorkExperience_8';
import WorkExperience_9 from './WorkExperience_9';
import WorkExperience_10 from './WorkExperience_10';
import WorkExperience_11 from './WorkExperience_11';

const work_experience = {
  id: 'workExperience', // 模块id
  moduleChName: '工作经验', // 模块中文名
  category: 'work_experience', // 模块分了
  icon: 'icon-gongzuotai', // 模块图标
  props: commonProps['workExperience'], // 公共的props
  dataSource: cloneDeep(commonDataSource['work_experience']), // 该分类下公用数据源
  css: commonCss['work_experience'],
  list: [
    WorkExperience_1,
    WorkExperience_2,
    WorkExperience_3,
    WorkExperience_4,
    WorkExperience_5,
    WorkExperience_6,
    WorkExperience_7,
    WorkExperience_8,
    WorkExperience_9,
    WorkExperience_10,
    WorkExperience_11
  ]
};

export default work_experience;
