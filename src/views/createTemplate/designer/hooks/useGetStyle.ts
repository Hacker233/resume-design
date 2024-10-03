import { IModule } from '../../types/IHJNewSchema';

// 返回最外层样式
export const useGetBoxStyle = (props: { module: IModule }) => {
  const boxStyle = computed(() => {
    return {
      width: `${props.module.css.width}px`,
      height: `${props.module.css.height}px`,
      background: props.module.css.background || '#ffffff',
      opacity: props.module.css.opacity || 1,
      backgroundImage: props.module.css.backgroundImage || '',
      fontSize: `${props.module.css.fontSize}px` || '',
      fontFamily: props.module.css.fontFamily || '微软雅黑',
      fontWeight: props.module.css.fontWeight || 400,
      color: props.module.css.color || '#000',
      display: props.module.css.display || 'flex',
      flexDirection: props.module.css.flexDirection || 'row',
      justifyContent: props.module.css.justifyContent || 'flex-start',
      alignItems: props.module.css.alignItems || 'center',
      paddingTop: `${props.module.css.padding.top}px` || '0px',
      paddingBottom: `${props.module.css.padding.bottom}px` || '0px',
      paddingLeft: `${props.module.css.padding.left}px` || '0px',
      paddingRight: `${props.module.css.padding.right}px` || '0px',
      marginTop: `${props.module.css.margin.top}px` || '0px',
      marginBottom: `${props.module.css.margin.bottom}px` || '0px',
      marginLeft: `${props.module.css.margin.left}px` || '0px',
      marginRight: `${props.module.css.margin.right}px` || '0px',
      borderWidth: `${props.module.css.borderWidth}px` || '0px',
      borderColor: props.module.css.borderColor || '#eee',
      borderRadius: `${props.module.css.borderRadius}px` || '0px',
      borderStyle: props.module.css.borderStyle || 'solid',
      boxShadow: props.module.css.boxShadow || 'none',
      zIndex: props.module.css.zIndex || 'auto',
      overflow: props.module.css.overflow || 'visible',
      textAlign: props.module.css.textAlign || 'left',
      lineHeight: props.module.css.lineHeight || 'normal',
      letterSpacing: `${props.module.css.letterSpacing}px` || 'normal',
      visibility: props.module.css.visibility || 'visible',
      position: props.module.css.position || 'static',
      top: props.module.css.top ? `${props.module.css.top}px` : 'auto',
      right: props.module.css.right ? `${props.module.css.right}px` : 'auto',
      bottom: props.module.css.bottom ? `${props.module.css.bottom}px` : 'auto',
      left: props.module.css.left ? `${props.module.css.left}px` : 'auto',
      cursor: props.module.css.cursor || 'auto',
      transition: props.module.css.transition || 'none',
      transform: props.module.css.transform || 'none',

      // 一级标题样式
      heading1FontSize: props.module.css.heading1FontSize || '32px',
      heading1FontWeight: props.module.css.heading1FontWeight || 'bold',
      heading1Color: props.module.css.heading1Color || '#000',
      heading1LineHeight: props.module.css.heading1LineHeight || '1.5',
      heading1LetterSpacing: props.module.css.heading1LetterSpacing || 'normal',

      // 二级标题样式
      heading2FontSize: props.module.css.heading2FontSize || '24px',
      heading2FontWeight: props.module.css.heading2FontWeight || 'bold',
      heading2Color: props.module.css.heading2Color || '#333',
      heading2LineHeight: props.module.css.heading2LineHeight || '1.4',
      heading2LetterSpacing: props.module.css.heading2LetterSpacing || 'normal',

      // 三级标题样式
      heading3FontSize: props.module.css.heading3FontSize || '18px',
      heading3FontWeight: props.module.css.heading3FontWeight || 'bold',
      heading3Color: props.module.css.heading3Color || '#666',
      heading3LineHeight: props.module.css.heading3LineHeight || '1.3',
      heading3LetterSpacing: props.module.css.heading3LetterSpacing || 'normal',

      // 正文字体样式
      bodyFontSize: props.module.css.bodyFontSize || '14px',
      bodyFontWeight: props.module.css.bodyFontWeight || 'normal',
      bodyColor: props.module.css.bodyColor || '#000',
      bodyLineHeight: props.module.css.bodyLineHeight || '1.6',
      bodyLetterSpacing: props.module.css.bodyLetterSpacing || 'normal'
    };
  });

  return boxStyle;
};
