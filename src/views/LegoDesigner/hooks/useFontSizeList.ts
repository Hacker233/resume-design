/**
 * @description 返回字号列表
 */
export const useFontSizeList = () => {
  const list = reactive<Array<any>>([]);
  for (let index = 8; index < 200; index += 2) {
    list.push({
      label: index,
      value: index
    });
  }
  return list;
};
