import { yipayGetPayURLAsync } from '@/http/api/pay';

// 易支付跳转至支付页面
export const yipayTradePagePayAsync = (data: any) => {
  return new Promise(async (resolve, reject) => {
    const params = {
      type: data.payType, // 支付类型
      totalAmount: data.totalAmount,
      subject: data.subject,
      orderType: data.orderType,
      returnUrl: window.location.href //回跳转地址
    };
    const result = await yipayGetPayURLAsync(params);
    if (result.data.status === 200) {
      console.log(result.data.data.pay_url);
      window.open(result.data.data.pay_url, '_blank');
      resolve('获取成功');
    } else {
      ElMessage.error(data.data.message);
      reject(null);
    }
  });
};
