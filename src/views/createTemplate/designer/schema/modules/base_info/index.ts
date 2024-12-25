import { cloneDeep } from 'lodash';
import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import BaseInfo_1 from './BaseInfo_1';
import BaseInfo_2 from './BaseInfo_2';
import BaseInfo_3 from './BaseInfo_3';
import BaseInfo_4 from './BaseInfo_4';
import BaseInfo_5 from './BaseInfo_5';
import BaseInfo_6 from './BaseInfo_6';
import BaseInfo_7 from './BaseInfo_7';
import BaseInfo_8 from './BaseInfo_8';
import BaseInfo_9 from './BaseInfo_9';
import BaseInfo_10 from './BaseInfo_10';
import BaseInfo_11 from './BaseInfo_11';

const base_info = {
  id: 'baseInfo', // 模块id
  moduleChName: '基本资料', // 模块中文名
  category: 'base_info', // 模块分了
  icon: 'icon-jichuxinxi', // 模块图标
  props: commonProps['baseInfo'], // 公共的props
  dataSource: cloneDeep(commonDataSource['base_info']), // 该分类下公用数据源
  css: commonCss['baseInfo'],
  list: [
    BaseInfo_1,
    BaseInfo_2,
    BaseInfo_3,
    BaseInfo_4,
    BaseInfo_5,
    BaseInfo_6,
    BaseInfo_7,
    BaseInfo_8,
    BaseInfo_9,
    BaseInfo_10,
    BaseInfo_11
  ]
};

export default base_info;
