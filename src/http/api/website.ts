import http from '../request';

// 新增微信群
export const vxqunAddAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/vxQun/vxqunAdd',
    method: 'post',
    data: data
  });
};

// 查询群列表
export const getVXQunListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/vxQun/getVXQunList',
    method: 'get',
    params: params
  });
};

// 修改群
export const vxqunUpdateAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/vxQun/vxqunUpdate',
    method: 'put',
    data: data
  });
};

// 删除群
export const vxqunDeleteAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/vxQun/vxqunDelete/${id}`,
    method: 'delete'
  });
};

// 无需权限查询群列表
export const getVXQunListUnauthAsync: any = () => {
  return http.request({
    url: '/huajian/common/getVXQunListUnauth',
    method: 'get'
  });
};
