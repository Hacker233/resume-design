import custom_1 from './Custom_1';
import custom_2 from './Custom_2';
import custom_3 from './Custom_3';

const custom = {
  id: 'custom', // 模块id
  moduleChName: '自定义', // 模块中文名
  category: 'custom', // 模块分了
  icon: 'icon-zuopin', // 模块图标
  props: {}, // 公共的props
  dataSource: {}, // 该分类下公用数据源
  css: {},
  list: [custom_1, custom_2, custom_3]
};

export default custom;
