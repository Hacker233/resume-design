import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import { cloneDeep } from 'lodash';
import SelfEvaluation_1 from './SelfEvaluation_1';
import SelfEvaluation_2 from './SelfEvaluation_2';
import SelfEvaluation_3 from './SelfEvaluation_3';
import SelfEvaluation_4 from './SelfEvaluation_4';
import SelfEvaluation_5 from './SelfEvaluation_5';
import SelfEvaluation_6 from './SelfEvaluation_6';
import SelfEvaluation_7 from './SelfEvaluation_7';
import SelfEvaluation_8 from './SelfEvaluation_8';
import SelfEvaluation_9 from './SelfEvaluation_9';
import SelfEvaluation_10 from './SelfEvaluation_10';

const self_evaluation = {
  id: 'self_evaluation', // 模块id
  moduleChName: '自我评价', // 模块中文名
  category: 'self_evaluation', // 模块分了
  icon: 'icon-ziwojieshao', // 模块图标
  props: commonProps['self_evaluation'], // 公共的props
  dataSource: cloneDeep(commonDataSource['self_evaluation']), // 该分类下公用数据源
  css: commonCss['self_evaluation'],
  list: [
    SelfEvaluation_1,
    SelfEvaluation_2,
    SelfEvaluation_3,
    SelfEvaluation_4,
    SelfEvaluation_5,
    SelfEvaluation_6,
    SelfEvaluation_7,
    SelfEvaluation_8,
    SelfEvaluation_9,
    SelfEvaluation_10
  ]
};

export default self_evaluation;
