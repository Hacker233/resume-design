import { IHJNewSchema, IModule } from '../../types/IHJNewSchema';

// 使用 import.meta.glob 来加载资产目录下的所有图片
const images = import.meta.glob('/src/assets/createTemplateImages/*', { eager: true });

// 根据prop返回自定义样式
export const useGetCustomStyle = (module: IModule | IHJNewSchema, prop: string) => {
  const loadBackgroundImage = (backgroundPath: string, element: any) => {
    if (backgroundPath) {
      const isOnlineUrl = backgroundPath.includes('https://');
      if (isOnlineUrl) {
        return `url(${backgroundPath})`;
      } else {
        const imageKey = `/src/assets/createTemplateImages/${backgroundPath}`;
        const image = images[imageKey] as { default: string }; // 类型断言
        if (image) {
          // 这里确保你取到了正确的图像 URL
          return `url(${image.default}) no-repeat`;
        } else {
          console.error(`Image not found for path: ${imageKey}`);
        }
      }
    } else {
      return element.css.background ?? '';
    }
  };

  const customStyle = computed(() => {
    for (let i = 0; i < module.customCss.length; i++) {
      const element: any = module.customCss[i];
      if (prop === element.prop) {
        // 在这里加载背景图像
        const background: string = loadBackgroundImage(element.css.backgroundPath, element);
        element.css.background = background;
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
          background: background,
          backgroundRepeat: element.css?.backgroundRepeat || '',
          opacity: element.css?.opacity ?? '',
          fontSize: element.css?.fontSize ? `${element.css.fontSize}px` : '',
          fontFamily: element.css?.fontFamily || '',
          fontWeight: element.css?.fontWeight || '',
          color: element.css?.color ?? '',
          display: element.css?.display || '',
          flex: element.css?.flex || '',
          flexWrap: element.css.flexWrap || '',
          flexDirection: element.css?.flexDirection || '',
          flexShrink: element.css?.flexShrink ?? 1,
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
          // 边框宽度
          borderTopWidth: element.css?.borderWidth ? `${element.css.borderWidth.top}px` : '0px',
          borderRightWidth: element.css?.borderWidth ? `${element.css.borderWidth.right}px` : '0px',
          borderBottomWidth: element.css?.borderWidth
            ? `${element.css.borderWidth.bottom}px`
            : '0px',
          borderLeftWidth: element.css?.borderWidth ? `${element.css.borderWidth.left}px` : '0px',

          borderColor: element.css?.borderColor ?? '',
          // 圆角
          borderTopLeftRadius: element.css?.borderRadius?.topLeft
            ? typeof element.css?.borderRadius?.topLeft === 'string'
              ? element.css?.borderRadius?.topLeft
              : `${element.css?.borderRadius?.topLeft}px`
            : '',
          borderTopRightRadius: element.css?.borderRadius?.topRight
            ? typeof element.css?.borderRadius?.topRight === 'string'
              ? element.css?.borderRadius?.topRight
              : `${element.css?.borderRadius?.topRight}px`
            : '',
          borderBottomLeftRadius: element.css?.borderRadius?.bottomLeft
            ? typeof element.css?.borderRadius?.bottomLeft === 'string'
              ? element.css?.borderRadius?.bottomLeft
              : `${element.css?.borderRadius?.bottomLeft}px`
            : '',
          borderBottomRightRadius: element.css?.borderRadius?.bottomRight
            ? typeof element.css?.borderRadius?.bottomRight === 'string'
              ? element.css?.borderRadius?.bottomRight
              : `${element.css?.borderRadius?.bottomRight}px`
            : '',
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

          // 处理旋转
          transform: element.css?.rotate
            ? `rotate(${element.css.rotate}deg)`
            : element.css?.transform || '',

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
          bodyLetterSpacing: element.css?.bodyLetterSpacing || '',

          // 主题颜色
          themeColor: element.css?.themeColor || ''
        };
      }
    }
    return {}; // 如果没有找到匹配的 prop，返回空对象
  });
  return customStyle;
};
