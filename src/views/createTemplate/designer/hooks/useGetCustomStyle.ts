import { IModule } from '../../types/IHJNewSchema';

// 根据prop返回自定义样式
export const useGetCustomStyle = (module: IModule, prop: string) => {
  const customStyle = computed(() => {
    for (let i = 0; i < module.customCss.length; i++) {
      const element: any = module.customCss[i];
      if (prop === element.prop) {
        return {
          width: element.css?.width
            ? typeof element.css.width === 'string'
              ? element.css.width
              : `${element.css.width}px`
            : '',
          height: element.css?.height
            ? typeof element.css.height === 'string'
              ? element.css.height
              : `${element.css.height}px`
            : '',
          background: element.css?.background || '',
          opacity: element.css?.opacity ?? '',
          backgroundImage: element.css?.backgroundImage || '',
          fontSize: element.css?.fontSize ? `${element.css.fontSize}px` : '',
          fontFamily: element.css?.fontFamily || '',
          fontWeight: element.css?.fontWeight || '',
          color: element.css?.color || '#121c26',
          display: element.css?.display || '',
          flexDirection: element.css?.flexDirection || '',
          justifyContent: element.css?.justifyContent || '',
          alignItems: element.css?.alignItems || '',
          paddingTop: element.css?.padding?.top ? `${element.css.padding.top}px` : '',
          paddingBottom: element.css?.padding?.bottom ? `${element.css.padding.bottom}px` : '',
          paddingLeft: element.css?.padding?.left ? `${element.css.padding.left}px` : '',
          paddingRight: element.css?.padding?.right ? `${element.css.padding.right}px` : '',
          marginTop: element.css?.margin?.top ? `${element.css.margin.top}px` : '',
          marginBottom: element.css?.margin?.bottom ? `${element.css.margin.bottom}px` : '',
          marginLeft: element.css?.margin?.left ? `${element.css.margin.left}px` : '',
          marginRight: element.css?.margin?.right ? `${element.css.margin.right}px` : '',
          borderWidth: element.css?.borderWidth ? `${element.css.borderWidth}px` : '',
          borderColor: element.css?.borderColor || '',
          borderRadius: element.css?.borderRadius ? `${element.css.borderRadius}px` : '',
          borderStyle: element.css?.borderStyle || '',
          boxShadow: element.css?.boxShadow || '',
          zIndex: element.css?.zIndex ?? '',
          overflow: element.css?.overflow || '',
          textAlign: element.css?.textAlign || '',
          lineHeight: element.css?.lineHeight || '',
          letterSpacing: element.css?.letterSpacing ? `${element.css.letterSpacing}px` : '',
          visibility: element.css?.visibility || '',
          position: element.css?.position || '',
          top: element.css?.top ? `${element.css.top}px` : '',
          right: element.css?.right ? `${element.css.right}px` : '',
          bottom: element.css?.bottom ? `${element.css.bottom}px` : '',
          left: element.css?.left ? `${element.css.left}px` : '',
          cursor: element.css?.cursor || '',
          transition: element.css?.transition || '',
          transform: element.css?.transform || '',

          // 一级标题样式
          heading1FontSize: element.css?.heading1FontSize || '',
          heading1FontWeight: element.css?.heading1FontWeight || '',
          heading1Color: element.css?.heading1Color || '',
          heading1LineHeight: element.css?.heading1LineHeight || '',
          heading1LetterSpacing: element.css?.heading1LetterSpacing || '',

          // 二级标题样式
          heading2FontSize: element.css?.heading2FontSize || '',
          heading2FontWeight: element.css?.heading2FontWeight || '',
          heading2Color: element.css?.heading2Color || '',
          heading2LineHeight: element.css?.heading2LineHeight || '',
          heading2LetterSpacing: element.css?.heading2LetterSpacing || '',

          // 三级标题样式
          heading3FontSize: element.css?.heading3FontSize || '',
          heading3FontWeight: element.css?.heading3FontWeight || '',
          heading3Color: element.css?.heading3Color || '',
          heading3LineHeight: element.css?.heading3LineHeight || '',
          heading3LetterSpacing: element.css?.heading3LetterSpacing || '',

          // 正文字体样式
          bodyFontSize: element.css?.bodyFontSize || '',
          bodyFontWeight: element.css?.bodyFontWeight || '',
          bodyColor: element.css?.bodyColor || '',
          bodyLineHeight: element.css?.bodyLineHeight || '',
          bodyLetterSpacing: element.css?.bodyLetterSpacing || ''
        };
      }
    }
    return {}; // 如果没有找到匹配的 prop，返回空对象
  });

  return customStyle;
};
