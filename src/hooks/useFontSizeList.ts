import { reactive } from 'vue';

/**
 * @description 返回字体大小列表
 */
export const useFontSizeList = () => {
  return reactive<Array<string>>([
    '10px',
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '22px',
    '24px',
    '26px',
    '28px',
    '30px',
    '32px',
    '34px',
    '36px',
    '38px',
    '40px'
  ]);
};
