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
import avatarUploadEditor from './dataSetters/avatarUploadEditor.vue';
import fontColorEditor from './fontColorEditor.vue';
import fontFamilyEditor from './fontFamilyEditor.vue';
import fontWeightEditor from './fontWeightEditor.vue';
import fontSizeEditor from './fontSizeEditor.vue';
import lineHeightEditor from './lineHeightEditor.vue';
import textAlignEditor from './textAlignEditor.vue';
import textEditEditor from './dataSetters/textEditEditor.vue';
import iconColorEditor from './iconColorEditor.vue';
import iconSizeEditor from './iconSizeEditor.vue';

// 属性设置组件对应关系
export const SETTERS_MAP: ISetterMap = {
  zIndex: zIndexEditor,
  width: widthEditor,
  height: heightEditor,
  fontSize: fontSizeEditor,
  fontFamily: fontFamilyEditor,
  fontWeight: fontWeightEditor,
  fontColor: fontColorEditor,
  left: leftEditorVue,
  top: topEditor,
  rotate: rotateEditor,
  backgroundColor: backgroundColorEditor,
  padding: paddingEditor,
  borderRadius: borderRadiusEditor,
  borderWidth: borderWidthEditor,
  borderColor: borderColorEditor,
  borderStyle: borderStyleEditor,
  lineHeight: lineHeightEditor,
  textAlign: textAlignEditor,
  iconColor: iconColorEditor,
  iconSize: iconSizeEditor
};

// 数据设置组件对应关系
export const DATA_SETTERS_MAP: ISetterMap = {
  avatarSrc: avatarUploadEditor,
  text: textEditEditor
};
