/**
 * @description 返回字号列表
 */
export const useFontSizeList = () => {
  return reactive<Array<any>>([
    {
      label: '1英寸',
      value: 95.6
    },
    {
      label: '大特号',
      value: 83.7
    },
    {
      label: '特号',
      value: 71.7
    },
    {
      label: '初号',
      value: 56
    },
    {
      label: '小初',
      value: 48
    },
    {
      label: '一号',
      value: 34.7
    },
    {
      label: '小一',
      value: 32
    },
    {
      label: '二号',
      value: 29.3
    },
    {
      label: '小二',
      value: 24
    },
    {
      label: '三号',
      value: 21.3
    },
    {
      label: '小三',
      value: 20
    },
    {
      label: '四号',
      value: 18.7
    },
    {
      label: '小四',
      value: 16
    },
    {
      label: '五号',
      value: 14
    },
    {
      label: '小五',
      value: 12
    },
    {
      label: '六号',
      value: 10
    },
    {
      label: '小六',
      value: 8.7
    },
    {
      label: '七号',
      value: 7.3
    },
    {
      label: '八号',
      value: 6.7
    }
  ]);
};
