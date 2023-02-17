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
