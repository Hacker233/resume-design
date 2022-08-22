import IMODELSTYLE from './modelStyle';

interface IMATERIALITEM {
  keyId: string;
  model: string;
  cptName: string; // 组件名
  cptOptionsName: string; // 组件属性设置面板名称
  cptTitle: string; // 组件名
  cptX: number; // 组件x坐标
  cptY: number; // 组件y坐标
  cptZ: number; // 组件z坐标
  cptHeight: string; // 组件高度
  cptWidth: string; // 组件宽度
  layout: string; // 布局在左侧还是右侧
  show: boolean; // 组件是否显示
  style: IMODELSTYLE | any;
  data: any;
}
// 物料左侧数据
interface IMSTERIALLISTJSON {
  [propName: string]: Array<IMATERIALITEM>;
}

export { IMSTERIALLISTJSON, IMATERIALITEM };
