import { reactive } from 'vue';

/**
 * @description 返回学历选项列表
 */
export const useDegreeList = () => {
  const degreeList: Array<string> = reactive([
    '初中',
    '高中',
    '大专',
    '本科',
    '全日制本科',
    '硕士',
    '非全硕士',
    '博士',
    '教授',
    '其它'
  ]);
  return {
    degreeList
  };
};
