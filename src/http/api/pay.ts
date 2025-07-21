import http from '../request';

// 新增付费用户
export const paystatsAddAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/paystats/paystatsAdd',
    method: 'post',
    data: data
  });
};

// 查询付费列表
export const getPaystatsListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/paystats/getPaystatsList',
    method: 'get',
    params: params
  });
};

// 删除付费用户
export const paystatsDeleteAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/paystats/paystatsDelete/${id}`,
    method: 'delete'
  });
};

// 修改付费用户
export const paystatsUpdateAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/paystats/paystatsUpdate',
    method: 'put',
    data: data
  });
};

// 查询用户是否付费过，即是否有查看权限
export const userIsPayCodeAsync: any = () => {
  return http.request({
    url: '/huajian/paystats/userIsPayCode',
    method: 'get'
  });
};

// 获取微信支付页面地址
export const getPayURLAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/yiPay/getPayURL',
    method: 'post',
    data: data
  });
};

// 微信支付查询订单信息
export const wxtradeQueryAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/yiPay/tradeQuery',
    method: 'get',
    params: params
  });
};

// 管理员分页查询易支付订单
export const yipayTradeQueryListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/yiPay/yipayTradeQueryList',
    method: 'get',
    params: params
  });
};

// 组织管理员分页查询易支付订单
export const yipayTradeQueryListByOrgAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/yiPay/yipayTradeQueryListByOrg',
    method: 'get',
    params: params
  });
};

// 管理员发起支付宝当面付退款
export const aliPayRefundAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/aliPay/aliPayRefund',
    method: 'post',
    data: data
  });
};

// 管理员同步易支付订单
export const yipayTradeQueryByAdminAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/yiPay/yipayTradeQueryByAdmin',
    method: 'get',
    params: params
  });
};

// 获取易支付页面支付链接
export const yipayGetPayURLAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/yiPay/getPayPageURL',
    method: 'post',
    data: data
  });
};

// 管理员发起易支付退款
export const yipayRefundAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/yiPay/refundByAdmin',
    method: 'post',
    data: data
  });
};
