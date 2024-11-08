import { cloneDeep } from 'lodash';
import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import Awards_1 from './Awards_1';
import Awards_2 from './Awards_2';
import Awards_3 from './Awards_3';
import Awards_4 from './Awards_4';
import Awards_5 from './Awards_5';
import Awards_6 from './Awards_6';
import Awards_7 from './Awards_7';
import Awards_8 from './Awards_8';
import Awards_9 from './Awards_9';
import Awards_10 from './Awards_10';
import Awards_11 from './Awards_11';
import Awards_12 from './Awards_12';

const edu_background = {
  id: 'awards', // 模块id
  moduleChName: '荣誉奖项', // 模块中文名
  category: 'awards', // 模块分了
  icon: 'icon-jiangbei', // 模块图标
  props: commonProps['awards'], // 公共的props
  dataSource: cloneDeep(commonDataSource['awards']), // 该分类下公用数据源
  css: commonCss['awards'],
  list: [
    Awards_1,
    Awards_2,
    Awards_3,
    Awards_4,
    Awards_5,
    Awards_6,
    Awards_7,
    Awards_8,
    Awards_9,
    Awards_10,
    Awards_11,
    Awards_12
  ]
};

export default edu_background;
