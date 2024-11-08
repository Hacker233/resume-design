import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import JobIntention_1 from './JobIntention_1';
import JobIntention_2 from './JobIntention_2';
import JobIntention_3 from './JobIntention_3';
import JobIntention_4 from './JobIntention_4';
import JobIntention_5 from './JobIntention_5';
import JobIntention_6 from './JobIntention_6';
import JobIntention_7 from './JobIntention_7';
import JobIntention_8 from './JobIntention_8';
import JobIntention_9 from './JobIntention_9';
import JobIntention_10 from './JobIntention_10';
import { cloneDeep } from 'lodash';

const job_intention = {
  id: 'jobIntention', // 模块id
  moduleChName: '求职意向', // 模块中文名
  category: 'jobIntention', // 模块分了
  icon: 'icon-qiuzhiyixiang1', // 模块图标
  props: commonProps['jobIntention'], // 公共的props
  dataSource: cloneDeep(commonDataSource['job_intention']), // 该分类下公用数据源
  css: commonCss['jobIntention'],
  list: [
    JobIntention_1,
    JobIntention_2,
    JobIntention_3,
    JobIntention_4,
    JobIntention_5,
    JobIntention_6,
    JobIntention_7,
    JobIntention_8,
    JobIntention_9,
    JobIntention_10
  ]
};

export default job_intention;
