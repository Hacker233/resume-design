import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import { cloneDeep } from 'lodash';
import Hobbies_1 from './Hobbies_1';
import Hobbies_2 from './Hobbies_2';
import Hobbies_3 from './Hobbies_3';
import Hobbies_4 from './Hobbies_4';
import Hobbies_5 from './Hobbies_5';
import Hobbies_6 from './Hobbies_6';
import Hobbies_7 from './Hobbies_7';
import Hobbies_8 from './Hobbies_8';
import Hobbies_9 from './Hobbies_9';
import Hobbies_10 from './Hobbies_10';

const hobbies = {
  id: 'hobbies', // 模块id
  moduleChName: '兴趣爱好', // 模块中文名
  category: 'hobbies', // 模块分了
  icon: 'icon-xingquaihao', // 模块图标
  props: commonProps['hobbies'], // 公共的props
  dataSource: cloneDeep(commonDataSource['hobbies']), // 该分类下公用数据源
  css: commonCss['hobbies'],
  list: [
    Hobbies_1,
    Hobbies_2,
    Hobbies_3,
    Hobbies_4,
    Hobbies_5,
    Hobbies_6,
    Hobbies_7,
    Hobbies_8,
    Hobbies_9,
    Hobbies_10
  ]
};

export default hobbies;
