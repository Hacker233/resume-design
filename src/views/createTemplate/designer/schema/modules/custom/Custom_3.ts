import { cloneDeep } from 'lodash';
import commonCss from '../../commonCss';
import commonDataSource from '../../commonDataSource';
import commonProps from '../../commonProps';
import customCss from '../../customCss';

const custom_3 = {
  id: 'Custom_3', // 组件唯一性id
  componentName: 'Custom_3', // 组件名
  commentType: '', // 组件类型
  icon: '', // 组件icon
  title: '姓名简介', // 组件中文名称
  description: '姓名简介模块', // 组件描述信息
  screenShot: {
    width: '49%',
    url: '',
    name: 'Custom_3.png'
  }, // 组件快照
  keywords: '姓名简介', // 组件关键词，用于搜索
  category: 'custom', // 组件分类
  props: commonProps['custom_3'], // 组件属性
  css: {
    ...commonCss['custom_3'],
    themeColor: '#d4ba38',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#fff',
    padding: {
      top: 40,
      right: 30,
      bottom: 0,
      left: 30
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  }, // 组件样式
  customCss: customCss['Custom_3'],
  dataSource: cloneDeep(commonDataSource['custom_3']), // 组件单独数据
  customProps: {} // 自定义属性字段
};

export default custom_3;
