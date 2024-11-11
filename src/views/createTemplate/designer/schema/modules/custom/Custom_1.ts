import { cloneDeep } from 'lodash';
import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import customCss from '../../customCss';

const custom_1 = {
  id: 'Custom_1', // 组件唯一性id
  componentName: 'Custom_1', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '姓名简介', // 组件中文名称
  description: '姓名简介模块', // 组件描述信息
  screenShot: {
    width: '100%',
    url: '',
    name: 'Custom_1.png'
  }, // 组件快照
  keywords: '姓名简介', // 组件关键词，用于搜索
  category: 'custom', // 组件分类
  props: commonProps['custom_1'], // 组件属性
  css: {
    ...commonCss['custom_1'],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: {
      top: 25,
      right: 5,
      bottom: 25,
      left: 40
    }
  }, // 组件样式
  customCss: customCss['Custom_1'],
  dataSource: cloneDeep(commonDataSource['custom_1']), // 组件单独数据
  customProps: {} // 自定义属性字段
};

export default custom_1;
