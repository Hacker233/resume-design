/**
 * 转换字符串，为null转换为空字符串
 * @param val
 * @returns
 */
export const str = <T>(val: T) => {
  if (val == null) {
    return '';
  }
  return String(val);
};
