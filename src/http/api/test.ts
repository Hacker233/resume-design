import http from '../request';

export const test = (data: any) => {
  return http.request({
    url: '/website/queryMenuWebsite',
    method: 'get',
    params: data
  });
};
