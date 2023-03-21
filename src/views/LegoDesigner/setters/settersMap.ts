import { ISetterMap } from '../types/widgetMap';
import widthEditor from './widthEditor.vue';
import heightEditor from './heightEditor.vue';
import zIndexEditor from './zIndexEditor.vue';
import borderWidthEditor from './borderWidthEditor.vue';
import borderColorEditor from './borderColorEditor.vue';
import borderStyleEditor from './borderStyleEditor.vue';
import borderRadiusEditor from './borderRadiusEditor.vue';
import backgroundColorEditor from './backgroundColorEditor.vue';
import paddingEditor from './paddingEditor.vue';
import rotateEditor from './rotateEditor.vue';
import leftEditorVue from './leftEditor.vue';
import topEditor from './topEditor.vue';

// 属性设置组件对应关系
export const SETTERS_MAP: ISetterMap = {
  zIndex: zIndexEditor,
  width: widthEditor,
  height: heightEditor,
  fontSize: 'fontSizeEditor',
  fontFamily: 'fontFimalyEditor',
  fontWeight: 'fontWeightEditor',
  color: 'colorEditor',
  left: leftEditorVue,
  top: topEditor,
  rotate: rotateEditor,
  backgroundColor: backgroundColorEditor,
  padding: paddingEditor,
  borderRadius: borderRadiusEditor,
  borderWidth: borderWidthEditor,
  borderColor: borderColorEditor,
  borderStyle: borderStyleEditor
};
