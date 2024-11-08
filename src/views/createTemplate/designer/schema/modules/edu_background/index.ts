import { cloneDeep } from 'lodash';
import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import EduBackground_1 from './EduBackground_1';
import EduBackground_2 from './EduBackground_2';
import EduBackground_3 from './EduBackground_3';
import EduBackground_4 from './EduBackground_4';
import EduBackground_5 from './EduBackground_5';
import EduBackground_6 from './EduBackground_6';
import EduBackground_7 from './EduBackground_7';
import EduBackground_8 from './EduBackground_8';
import EduBackground_9 from './EduBackground_9';
import EduBackground_10 from './EduBackground_10';
import EduBackground_11 from './EduBackground_11';
import EduBackground_12 from './EduBackground_12';

const edu_background = {
  id: 'eduBackground', // 模块id
  moduleChName: '教育背景', // 模块中文名
  category: 'eduBackground', // 模块分了
  icon: 'icon-jiaoyu', // 模块图标
  props: commonProps['eduBackground'], // 公共的props
  dataSource: cloneDeep(commonDataSource['edu_background']), // 该分类下公用数据源
  css: commonCss['eduBackground'],
  list: [
    EduBackground_1,
    EduBackground_2,
    EduBackground_3,
    EduBackground_4,
    EduBackground_5,
    EduBackground_6,
    EduBackground_7,
    EduBackground_8,
    EduBackground_9,
    EduBackground_10,
    EduBackground_11,
    EduBackground_12
  ]
};

export default edu_background;
