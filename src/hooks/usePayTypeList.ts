import { reactive } from 'vue';

/**
 * @description 返回付费类型列表
 */
export const usePayTypeList = () => {
  return reactive<Array<{ label: string; value: string }>>([
    {
      label: '源码购买',
      value: 'codePay'
    },
    {
      label: '付费部署',
      value: 'deployPay'
    },
    {
      label: '源码购买+部署',
      value: 'deployAndCodePay'
    }
  ]);
};
