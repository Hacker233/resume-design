import { cloneDeep } from 'lodash';
import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import EduBackground_1 from './EduBackground_1';
import EduBackground_2 from './EduBackground_2';
import EduBackground_3 from './EduBackground_3';
import EduBackground_4 from './EduBackground_4';

const edu_background = {
  id: 'eduBackground', // 模块id
  moduleChName: '教育背景', // 模块中文名
  category: 'eduBackground', // 模块分了
  icon: 'icon-jichuxinxi', // 模块图标
  props: commonProps['eduBackground'], // 公共的props
  dataSource: cloneDeep(commonDataSource['edu_background']), // 该分类下公用数据源
  css: commonCss['eduBackground'],
  list: [EduBackground_1, EduBackground_2, EduBackground_3, EduBackground_4]
};

export default edu_background;
