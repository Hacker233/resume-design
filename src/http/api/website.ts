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

// 管理员新增友链
export const linksAddAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/links/linksAdd',
    method: 'post',
    data: data
  });
};

// 修改友链
export const linksUpdateAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/links/linksUpdate',
    method: 'put',
    data: data
  });
};

// 删除友链
export const linksDeleteAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/links/linksDelete/${id}`,
    method: 'delete'
  });
};

// 查询友链列表
export const getLinksListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/common/getLinksList',
    method: 'get',
    params: params
  });
};

// 用户申请友链
export const applyLinksAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/links/applyLinks',
    method: 'post',
    data: data
  });
};
