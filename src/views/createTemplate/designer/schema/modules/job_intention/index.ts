import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';

const job_intention = {
  id: 'jobIntention', // 模块id
  moduleChName: '求职意向', // 模块中文名
  category: 'jobIntention', // 模块分了
  icon: 'icon-jichuxinxi', // 模块图标
  props: commonProps['jobIntention'], // 公共的props
  dataSource: commonDataSource['jobIntention'], // 该分类下公用数据源
  css: commonCss['jobIntention'],
  list: []
};

export default job_intention;
