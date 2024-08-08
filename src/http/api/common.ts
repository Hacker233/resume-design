import http from '../request';

// 查询所需要的简币数
export const getIntegralPayNumberAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/common/getIntegralPayNumber',
    method: 'get',
    params: params
  });
};
