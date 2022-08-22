import IGlobalStyle from '@/interface/globalStyle';
import { IMATERIALITEM } from '@/interface/material';

interface IRESUMEJSON {
  ID: string; // 模板Id
  NAME: string;
  TITLE: string;
  LAYOUT: string;
  COMPONENTS: Array<IMATERIALITEM | any>; // 模板内组件列表
  GLOBAL_STYLE: IGlobalStyle | any; // 全局样式
}
export default IRESUMEJSON;
