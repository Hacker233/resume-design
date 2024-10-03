import { ISetterMap } from '@/views/createTemplate/types/IHJNewSchema';

import width from './width.vue';
import height from './height.vue';
import fontSize from './fontSize.vue';
import color from './color.vue';
import flexDirection from './flexDirection.vue';
import justifyContent from './justifyContent.vue';
import alignItems from './alignItems.vue';
import background from './background.vue';
import fontWeight from './fontWeight.vue';
import fontFamily from './fontFamily.vue';
import letterSpacing from './letterSpacing.vue';
import opacity from './opacity.vue';
import borderWidth from './borderWidth.vue';
import borderRadius from './borderRadius.vue';
import borderColor from './borderColor.vue';
import borderStyle from './borderStyle.vue';
import padding from './padding.vue';
import margin from './margin.vue';

const settersStyleCptMap: ISetterMap = {
  width,
  height,
  fontSize,
  color,
  flexDirection,
  justifyContent,
  alignItems,
  background,
  fontWeight,
  fontFamily,
  letterSpacing,
  opacity,
  borderWidth,
  borderRadius,
  borderColor,
  borderStyle,
  padding,
  margin
};
export default settersStyleCptMap;
