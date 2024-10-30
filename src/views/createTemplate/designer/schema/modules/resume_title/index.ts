import { cloneDeep } from 'lodash';
import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import ResumeTitle_1 from './ResumeTitle_1';
import ResumeTitle_2 from './ResumeTitle_2';

const resume_title = {
  id: 'resumeTitle', // 模块id
  moduleChName: '简历标题', // 模块中文名
  category: 'resumeTitle', // 模块分了
  icon: 'icon-title', // 模块图标
  props: commonProps['resumeTitle'], // 公共的props
  dataSource: cloneDeep(commonDataSource['resume_title']), // 该分类下公用数据源
  css: commonCss['resumeTitle'], // 公共css属性
  list: [ResumeTitle_1, ResumeTitle_2]
};

export default resume_title;
