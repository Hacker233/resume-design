import { storeToRefs } from 'pinia';
import appStore from '@/store';
import { IModule } from '../../types/IHJNewSchema';

// 返回最外层样式
export const useGetPageStyle = () => {
  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);

  const images = import.meta.glob('/src/assets/createTemplateImages/*', { eager: true });

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
      return element.css.background || 'none';
    }
  };

  // 全局主题色发生变化
  watch(
    () => HJNewJsonStore.value.css.themeColor,
    (newVal) => {
      if (newVal) {
        console.log('全局主题色变化', newVal);
        HJNewJsonStore.value.componentsTree.forEach((module: IModule) => {
          module.css.themeColor = newVal;
        });
      }
    },
    {
      deep: true
    }
  );

  // 全局字体发生变化
  watch(
    () => HJNewJsonStore.value.css.fontFamily,
    (newVal) => {
      if (newVal) {
        console.log('全局字体变化', newVal);
        HJNewJsonStore.value.componentsTree.forEach((module: IModule) => {
          module.css['fontFamily'] = newVal;
        });
      }
    },
    {
      deep: true
    }
  );

  // 全局模块左内边距发生变化
  watch(
    () => HJNewJsonStore.value.css.modulePadding?.left,
    (newVal, oldVal) => {
      if (newVal && oldVal) {
        HJNewJsonStore.value.componentsTree.forEach((module: IModule) => {
          module.css['padding'].left = newVal;
        });
      }
    },
    {
      deep: true
    }
  );

  // 全局模块上内边距发生变化
  watch(
    () => HJNewJsonStore.value.css.modulePadding?.top,
    (newVal, oldVal) => {
      if (newVal && oldVal) {
        HJNewJsonStore.value.componentsTree.forEach((module: IModule) => {
          module.css['padding'].top = newVal;
        });
      }
    },
    {
      deep: true
    }
  );

  // 全局模块右内边距发生变化
  watch(
    () => HJNewJsonStore.value.css.modulePadding?.right,
    (newVal, oldVal) => {
      if (newVal && oldVal) {
        HJNewJsonStore.value.componentsTree.forEach((module: IModule) => {
          module.css['padding'].right = newVal;
        });
      }
    },
    {
      deep: true
    }
  );

  // 全局模块下内边距发生变化
  watch(
    () => HJNewJsonStore.value.css.modulePadding?.bottom,
    (newVal, oldVal) => {
      if (newVal && oldVal) {
        HJNewJsonStore.value.componentsTree.forEach((module: IModule) => {
          module.css['padding'].bottom = newVal;
        });
      }
    },
    {
      deep: true
    }
  );

  // 全局模块左外边距发生变化
  watch(
    () => HJNewJsonStore.value.css.moduleMargin?.left,
    (newVal, oldVal) => {
      if (newVal && oldVal) {
        HJNewJsonStore.value.componentsTree.forEach((module: IModule) => {
          module.css['margin'].left = newVal;
        });
      }
    },
    {
      deep: true
    }
  );

  // 全局模块上内边距发生变化
  watch(
    () => HJNewJsonStore.value.css.moduleMargin?.top,
    (newVal, oldVal) => {
      if (newVal && oldVal) {
        HJNewJsonStore.value.componentsTree.forEach((module: IModule) => {
          module.css['margin'].top = newVal;
        });
      }
    },
    {
      deep: true
    }
  );

  // 全局模块右内边距发生变化
  watch(
    () => HJNewJsonStore.value.css.moduleMargin?.right,
    (newVal, oldVal) => {
      if (newVal && oldVal) {
        HJNewJsonStore.value.componentsTree.forEach((module: IModule) => {
          module.css['margin'].right = newVal;
        });
      }
    },
    {
      deep: true
    }
  );

  // 全局模块下内边距发生变化
  watch(
    () => HJNewJsonStore.value.css.moduleMargin?.bottom,
    (newVal, oldVal) => {
      if (newVal && oldVal) {
        HJNewJsonStore.value.componentsTree.forEach((module: IModule) => {
          module.css['margin'].bottom = newVal;
        });
      }
    },
    {
      deep: true
    }
  );

  const boxStyle = computed(() => {
    // 在这里加载背景图像
    const background: string = loadBackgroundImage(
      HJNewJsonStore.value.css.backgroundPath,
      HJNewJsonStore.value
    );
    HJNewJsonStore.value.css.background = background;
    return {
      width: HJNewJsonStore.value.css?.width
        ? typeof HJNewJsonStore.value.css.width === 'string'
          ? HJNewJsonStore.value.css.width
          : `${HJNewJsonStore.value.css.width}px`
        : '',
      height: HJNewJsonStore.value.css?.height
        ? typeof HJNewJsonStore.value.css.height === 'string'
          ? HJNewJsonStore.value.css.height
          : `${HJNewJsonStore.value.css.height}px`
        : '',
      background: background,
      backgroundRepeat: HJNewJsonStore.value.css?.backgroundRepeat || '',
      opacity: HJNewJsonStore.value.css.opacity ?? 1,
      fontSize: `${HJNewJsonStore.value.css.fontSize}px` || '',
      fontFamily: HJNewJsonStore.value.css.fontFamily || '微软雅黑',
      fontWeight: HJNewJsonStore.value.css.fontWeight || 400,
      color: HJNewJsonStore.value.css.color || '#000',
      display: HJNewJsonStore.value.css.display || 'flex',
      flex: HJNewJsonStore.value.css.flex || '',
      flexWrap: HJNewJsonStore.value.css.flexWrap || '',
      flexDirection: HJNewJsonStore.value.css.flexDirection || 'row',
      flexShrink: HJNewJsonStore.value.css?.flexShrink || 1,
      justifyContent: HJNewJsonStore.value.css.justifyContent || 'flex-start',
      alignItems: HJNewJsonStore.value.css.alignItems || 'center',
      paddingTop: HJNewJsonStore.value.css?.padding?.top
        ? `${HJNewJsonStore.value.css.padding.top}px`
        : '',
      paddingBottom: HJNewJsonStore.value.css?.padding?.bottom
        ? `${HJNewJsonStore.value.css.padding.bottom}px`
        : '',
      paddingLeft: HJNewJsonStore.value.css?.padding?.left
        ? `${HJNewJsonStore.value.css.padding.left}px`
        : '',
      paddingRight: HJNewJsonStore.value.css?.padding?.right
        ? `${HJNewJsonStore.value.css.padding.right}px`
        : '',
      marginTop: HJNewJsonStore.value.css?.margin?.top
        ? `${HJNewJsonStore.value.css.margin.top}px`
        : '',
      marginBottom: HJNewJsonStore.value.css?.margin?.bottom
        ? `${HJNewJsonStore.value.css.margin.bottom}px`
        : '',
      marginLeft: HJNewJsonStore.value.css?.margin?.left
        ? `${HJNewJsonStore.value.css.margin.left}px`
        : '',
      marginRight: HJNewJsonStore.value.css?.margin?.right
        ? `${HJNewJsonStore.value.css.margin.right}px`
        : '',
      // 边框宽度
      borderTopWidth: HJNewJsonStore.value.css?.borderWidth
        ? `${HJNewJsonStore.value.css.borderWidth.top}px`
        : '0px',
      borderRightWidth: HJNewJsonStore.value.css?.borderWidth
        ? `${HJNewJsonStore.value.css.borderWidth.right}px`
        : '0px',
      borderBottomWidth: HJNewJsonStore.value.css?.borderWidth
        ? `${HJNewJsonStore.value.css.borderWidth.bottom}px`
        : '0px',
      borderLeftWidth: HJNewJsonStore.value.css?.borderWidth
        ? `${HJNewJsonStore.value.css.borderWidth.left}px`
        : '0px',

      borderColor: HJNewJsonStore.value.css.borderColor || '#eee',
      // 圆角
      borderTopLeftRadius: HJNewJsonStore.value.css?.borderRadius?.topLeft
        ? typeof HJNewJsonStore.value.css?.borderRadius?.topLeft === 'string'
          ? HJNewJsonStore.value.css?.borderRadius?.topLeft
          : `${HJNewJsonStore.value.css?.borderRadius?.topLeft}px`
        : '',
      borderTopRightRadius: HJNewJsonStore.value.css?.borderRadius?.topRight
        ? typeof HJNewJsonStore.value.css?.borderRadius?.topRight === 'string'
          ? HJNewJsonStore.value.css?.borderRadius?.topRight
          : `${HJNewJsonStore.value.css?.borderRadius?.topRight}px`
        : '',
      borderBottomLeftRadius: HJNewJsonStore.value.css?.borderRadius?.bottomLeft
        ? typeof HJNewJsonStore.value.css?.borderRadius?.bottomLeft === 'string'
          ? HJNewJsonStore.value.css?.borderRadius?.bottomLeft
          : `${HJNewJsonStore.value.css?.borderRadius?.bottomLeft}px`
        : '',
      borderBottomRightRadius: HJNewJsonStore.value.css?.borderRadius?.bottomRight
        ? typeof HJNewJsonStore.value.css?.borderRadius?.bottomRight === 'string'
          ? HJNewJsonStore.value.css?.borderRadius?.bottomRight
          : `${HJNewJsonStore.value.css?.borderRadius?.bottomRight}px`
        : '',
      borderStyle: HJNewJsonStore.value.css.borderStyle || 'solid',
      boxShadow: HJNewJsonStore.value.css.boxShadow || 'none',
      zIndex: HJNewJsonStore.value.css.zIndex || 'auto',
      overflow: HJNewJsonStore.value.css.overflow || 'visible',
      textAlign: HJNewJsonStore.value.css.textAlign || 'left',
      lineHeight: HJNewJsonStore.value.css.lineHeight || 'normal',
      letterSpacing: `${HJNewJsonStore.value.css.letterSpacing}px` || 'normal',
      visibility: HJNewJsonStore.value.css.visibility || 'visible',
      position: HJNewJsonStore.value.css.position || 'static',
      top: HJNewJsonStore.value.css.top ? `${HJNewJsonStore.value.css.top}px` : 'auto',
      right: HJNewJsonStore.value.css.right ? `${HJNewJsonStore.value.css.right}px` : 'auto',
      bottom: HJNewJsonStore.value.css.bottom ? `${HJNewJsonStore.value.css.bottom}px` : 'auto',
      left: HJNewJsonStore.value.css.left ? `${HJNewJsonStore.value.css.left}px` : 'auto',
      cursor: HJNewJsonStore.value.css.cursor || 'auto',
      transition: HJNewJsonStore.value.css.transition || 'none',

      // 处理旋转
      transform: HJNewJsonStore.value.css?.rotate
        ? `rotate(${HJNewJsonStore.value.css.rotate}deg)`
        : HJNewJsonStore.value.css?.transform || '',

      // 一级标题样式
      heading1FontSize: HJNewJsonStore.value.css.heading1FontSize || '32px',
      heading1FontWeight: HJNewJsonStore.value.css.heading1FontWeight || 'bold',
      heading1Color: HJNewJsonStore.value.css.heading1Color || '#000',
      heading1LineHeight: HJNewJsonStore.value.css.heading1LineHeight || '1.5',
      heading1LetterSpacing: HJNewJsonStore.value.css.heading1LetterSpacing || 'normal',

      // 二级标题样式
      heading2FontSize: HJNewJsonStore.value.css.heading2FontSize || '24px',
      heading2FontWeight: HJNewJsonStore.value.css.heading2FontWeight || 'bold',
      heading2Color: HJNewJsonStore.value.css.heading2Color || '#333',
      heading2LineHeight: HJNewJsonStore.value.css.heading2LineHeight || '1.4',
      heading2LetterSpacing: HJNewJsonStore.value.css.heading2LetterSpacing || 'normal',

      // 三级标题样式
      heading3FontSize: HJNewJsonStore.value.css.heading3FontSize || '18px',
      heading3FontWeight: HJNewJsonStore.value.css.heading3FontWeight || 'bold',
      heading3Color: HJNewJsonStore.value.css.heading3Color || '#666',
      heading3LineHeight: HJNewJsonStore.value.css.heading3LineHeight || '1.3',
      heading3LetterSpacing: HJNewJsonStore.value.css.heading3LetterSpacing || 'normal',

      // 正文字体样式
      bodyFontSize: HJNewJsonStore.value.css.bodyFontSize || '14px',
      bodyFontWeight: HJNewJsonStore.value.css.bodyFontWeight || 'normal',
      bodyColor: HJNewJsonStore.value.css.bodyColor || '#000',
      bodyLineHeight: HJNewJsonStore.value.css.bodyLineHeight || '1.6',
      bodyLetterSpacing: HJNewJsonStore.value.css.bodyLetterSpacing || 'normal',

      // 主题颜色
      themeColor: HJNewJsonStore.value.css?.themeColor || ''
    };
  });
  console.log('计算boxStyle', boxStyle);
  return boxStyle;
};
