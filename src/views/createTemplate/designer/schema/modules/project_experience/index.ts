import { cloneDeep } from 'lodash';
import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import ProjectExperience_1 from './ProjectExperience_1';
import ProjectExperience_2 from './ProjectExperience_2';
import ProjectExperience_3 from './ProjectExperience_3';
import ProjectExperience_4 from './ProjectExperience_4';
import ProjectExperience_5 from './ProjectExperience_5';
import ProjectExperience_6 from './ProjectExperience_6';
import ProjectExperience_7 from './ProjectExperience_7';
import ProjectExperience_8 from './ProjectExperience_8';
import ProjectExperience_9 from './ProjectExperience_9';
import ProjectExperience_10 from './ProjectExperience_10';
import ProjectExperience_11 from './ProjectExperience_11';

const project_experience = {
  id: 'projectExperience', // 模块id
  moduleChName: '项目经验', // 模块中文名
  category: 'project_experience', // 模块分了
  icon: 'icon-xiangmu1', // 模块图标
  props: commonProps['projectExperience'], // 公共的props
  dataSource: cloneDeep(commonDataSource['project_experience']), // 该分类下公用数据源
  css: commonCss['project_experience'],
  list: [
    ProjectExperience_1,
    ProjectExperience_2,
    ProjectExperience_3,
    ProjectExperience_4,
    ProjectExperience_5,
    ProjectExperience_6,
    ProjectExperience_7,
    ProjectExperience_8,
    ProjectExperience_9,
    ProjectExperience_10,
    ProjectExperience_11
  ]
};

export default project_experience;
