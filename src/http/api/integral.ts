import http from '../request';

// 查询用户简币
export const getUserIntegralTotalAsync: any = () => {
  return http.request({
    url: '/huajian/integral/getUserIntegralTotal',
    method: 'get'
  });
};

// 添加用户简币信息
export const addIntegralLogAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/integral/addIntegralLog',
    method: 'post',
    data: data
  });
};

// 查询用户简币日志
export const getUserIntegralLogsAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/integral/getUserIntegralLogs',
    method: 'get',
    params: params
  });
};

// 用户消费简币
export const payIntegralLogAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/integral/payIntegralLog',
    method: 'post',
    data: data
  });
};

// 查询用户是否消费过该资源
export const getUserIsPayGoodsAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/integral/getUserIsPayGoods',
    method: 'get',
    params: params
  });
};

// 获取今日签到总人数
export const getTodayAttendancePersonTotalAsync: any = () => {
  return http.request({
    url: '/huajian/common/getTodayAttendancePersonTotal',
    method: 'get'
  });
};

// 管理员查询所有简币列表
export const getAllIntegralListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/integral/getAllIntegralList',
    method: 'get',
    params: params
  });
};

// 管理员删除简币记录
export const integralDeleteAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/integral/integralDelete/${id}`,
    method: 'delete'
  });
};

// 管理员添加简币记录
export const addIntegralLogByAdminAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/integral/addIntegralLogByAdmin',
    method: 'post',
    data: data
  });
};

// 管理员查询简币消费配置列表
export const getIntegralPayConfigAsync: any = () => {
  return http.request({
    url: '/huajian/integral/getIntegralPayConfig',
    method: 'get'
  });
};

// 管理员新增简币消费配置
export const addIntegralPayConfigAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/integral/addIntegralPayConfig',
    method: 'post',
    data: data
  });
};

// 管理员更新简币消费配置
export const updateIntegralPayConfigAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/integral/updateIntegralPayConfig',
    method: 'post',
    data: data
  });
};

// 管理员删除简币消费配置
export const deleteIntegralPayConfigAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/integral/deleteIntegralPayConfig/${id}`,
    method: 'delete'
  });
};

// 获取支付二维码
export const aliPayAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/aliPay/aliPay',
    method: 'post',
    data: data
  });
};

// 查询订单状态
export const tradeQueryAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/aliPay/tradeQuery',
    method: 'get',
    params: params
  });
};

// 关闭交易
export const tradeCloseAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/aliPay/tradeClose',
    method: 'post',
    data: data
  });
};

// 管理员分页查询当面付订单
export const tradeQueryListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/aliPay/tradeQueryList',
    method: 'get',
    params: params
  });
};

// 组织管理员分页查询当面付订单
export const orgTradeQueryListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/aliPay/orgTradeQueryList',
    method: 'get',
    params: params
  });
};

// 管理员同步支付宝订单信息
export const tradeQueryByAdminAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/aliPay/tradeQueryByAdmin',
    method: 'get',
    params: params
  });
};

// 用户查询个人支付订单
export const getUserOrderListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/aliPay/getUserOrderList',
    method: 'get',
    params: params
  });
};

// 获取当月签到列表
export const getMonthAttendanceListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/integral/getMonthAttendanceList',
    method: 'get',
    params: params
  });
};
