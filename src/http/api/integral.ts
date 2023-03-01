import http from '../request';

// 查询用户积分
export const getUserIntegralTotalAsync: any = () => {
  return http.request({
    url: '/huajian/integral/getUserIntegralTotal',
    method: 'get'
  });
};

// 添加用户积分信息
export const addIntegralLogAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/integral/addIntegralLog',
    method: 'post',
    data: data
  });
};
