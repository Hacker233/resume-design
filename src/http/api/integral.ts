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
