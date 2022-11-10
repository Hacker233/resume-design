/**
 * @description 返回字体列表
 */
export const useFontFamilyList = () => {
  return reactive<Array<string>>([
    '方正仿宋',
    '方正书宋简体',
    '手书体',
    '微软雅黑',
    '站酷酷黑',
    '站酷快乐体'
  ]);
};
