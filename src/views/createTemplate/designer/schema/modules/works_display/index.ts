import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import { cloneDeep } from 'lodash';
import WorksDisplay_1 from './WorksDisplay_1';
import WorksDisplay_2 from './WorksDisplay_2';
import WorksDisplay_3 from './WorksDisplay_3';
import WorksDisplay_4 from './WorksDisplay_4';
import WorksDisplay_5 from './WorksDisplay_5';
import WorksDisplay_6 from './WorksDisplay_6';
import WorksDisplay_7 from './WorksDisplay_7';
import WorksDisplay_8 from './WorksDisplay_8';
import WorksDisplay_9 from './WorksDisplay_9';
import WorksDisplay_10 from './WorksDisplay_10';

const works_display = {
  id: 'works_display', // 模块id
  moduleChName: '作品展示', // 模块中文名
  category: 'works_display', // 模块分了
  icon: 'icon-zuopinzhanshi', // 模块图标
  props: commonProps['works_display'], // 公共的props
  dataSource: cloneDeep(commonDataSource['works_display']), // 该分类下公用数据源
  css: commonCss['works_display'],
  list: [
    WorksDisplay_1,
    WorksDisplay_2,
    WorksDisplay_3,
    WorksDisplay_4,
    WorksDisplay_5,
    WorksDisplay_6,
    WorksDisplay_7,
    WorksDisplay_8,
    WorksDisplay_9,
    WorksDisplay_10
  ]
};

export default works_display;
