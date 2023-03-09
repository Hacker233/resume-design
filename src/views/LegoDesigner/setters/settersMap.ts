import { ISetterMap } from '../types/widgetMap';
import widthEditor from './widthEditor.vue';

// 属性设置组件对应关系
export const SETTERS_MAP: ISetterMap = {
  width: widthEditor,
  height: 'heightEditor',
  fontSize: 'fontSizeEditor',
  fontFamily: 'fontFimalyEditor',
  fontWeight: 'fontWeightEditor',
  color: 'colorEditor',
  backgroundColor: 'backgroundColorEditor',
  marginTop: 'marginTopEditor',
  marginRight: 'marginRightEditog',
  marginBottom: 'marginBottomEditor',
  marginLeft: 'marginLeftEditor',
  paddingTop: 'paddingTopEditor',
  paddingRight: 'paddingRightEditor',
  paddingBottom: 'paddingBottomEditor',
  paddingLeft: 'paddingLeftEditor',
  borderRadius: 'borderRadiusEditor',
  borderWidth: 'borderWidthEditor',
  borderColor: 'borderColorEditor',
  boderStyle: 'borderStyleEditor',
  zIndex: 'zIndexEditor'
};
