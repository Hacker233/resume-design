import { cloneDeep } from 'lodash';
import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import InternshipExperience_1 from './InternshipExperience_1';
import InternshipExperience_2 from './InternshipExperience_2';

const base_info = {
  id: 'internshipExperience', // 模块id
  moduleChName: '实习经验', // 模块中文名
  category: 'internshipExperience', // 模块分了
  icon: 'icon-jichuxinxi', // 模块图标
  props: commonProps['internshipExperience'], // 公共的props
  dataSource: cloneDeep(commonDataSource['internship_experience']), // 该分类下公用数据源
  css: commonCss['internship_experience'],
  list: [InternshipExperience_1, InternshipExperience_2]
};

export default base_info;
