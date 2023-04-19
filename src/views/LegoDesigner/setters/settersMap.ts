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
import fontColorEditor from './fontColorEditor.vue';
import fontFamilyEditor from './fontFamilyEditor.vue';
import fontWeightEditor from './fontWeightEditor.vue';
import fontSizeEditor from './fontSizeEditor.vue';
import lineHeightEditor from './lineHeightEditor.vue';
import textAlignEditor from './textAlignEditor.vue';
import iconColorEditor from './iconColorEditor.vue';
import iconSizeEditor from './iconSizeEditor.vue';
import markerSizeEditor from './markerSizeEditor.vue';
import markerColorEditor from './markerColorEditor.vue';
import markerPositionEditor from './markerPositionEditor.vue';
import sizeEditor from './sizeEditor.vue';
import rateSizeEditor from './rateSizeEditor.vue';
import voidColorEditor from './voidColorEditor.vue';
import activeColorEditor from './activeColorEditor.vue';
import showTextEditor from './showTextEditor.vue';
import aidedTextColorEditor from './aidedTextColorEditor.vue';
import rateHeightEditor from './rateHeightEditor.vue';

// 数据设置组件
import textEditEditor from './dataSetters/textEditEditor.vue';
import avatarUploadEditor from './dataSetters/avatarUploadEditor.vue';
import liListEditor from './dataSetters/liListEditor.vue';
import rateValueEditor from './dataSetters/rateValueEditor.vue';
import yearEditor from './dataSetters/yearEditor.vue';
import monthEditor from './dataSetters/monthEditor.vue';
import dayEditor from './dataSetters/dayEditor.vue';
import monthRangeEditor from './dataSetters/monthRangeEditor.vue';
import dateRangeEditor from './dataSetters/dateRangeEditor.vue';
import imgUrlUploadEditor from './dataSetters/imgUrlUploadEditor.vue';

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
  iconSize: iconSizeEditor,
  markerSize: markerSizeEditor,
  markerColor: markerColorEditor,
  markerPosition: markerPositionEditor,
  size: sizeEditor,
  rateSize: rateSizeEditor,
  voidColor: voidColorEditor,
  activeColor: activeColorEditor,
  showText: showTextEditor,
  aidedTextColor: aidedTextColorEditor,
  rateHeight: rateHeightEditor
};

// 数据设置组件对应关系
export const DATA_SETTERS_MAP: ISetterMap = {
  avatarSrc: avatarUploadEditor,
  text: textEditEditor,
  liList: liListEditor,
  rateValue: rateValueEditor,
  year: yearEditor,
  month: monthEditor,
  day: dayEditor,
  monthRange: monthRangeEditor,
  dateRange: dateRangeEditor,
  imgUrl: imgUrlUploadEditor
};
