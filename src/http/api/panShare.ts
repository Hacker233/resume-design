import http from '../request';

// 查询网盘资源分类列表
export const panShareCategroyListAsync: any = () => {
  return http.request({
    url: '/huajian/common/panShareCategroyList',
    method: 'get'
  });
};

// 新增网盘资源分类
export const panShareCategroyAddAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/panShare/panShareCategroyAdd',
    method: 'post',
    data: data
  });
};

// 更新网盘资源分类
export const panShareCategroyUpdateAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/panShare/panShareCategroyUpdate',
    method: 'put',
    data: data
  });
};
// 删除网盘资源分类
export const panShareCategroyDeleteAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/panShare/panShareCategroyDelete/${id}`,
    method: 'delete'
  });
};

// 管理员查询网盘资源分享列表
export const getPanSourceShareListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/panShare/getPanSourceShareList',
    method: 'get',
    params: params
  });
};

// 管理员新增网盘资源
export const addPanSourceAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/panShare/addPanSource',
    method: 'post',
    data: data
  });
};

// 管理员更新网盘资源
export const updatePanSourceAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/panShare/updatePanSource',
    method: 'post',
    data: data
  });
};

// 删除资源
export const deletePanSourceAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/panShare/deletePanSourceAsync/${id}`,
    method: 'delete'
  });
};

// 查询所有标签列表
export const getPanShareTagsListAsync: any = () => {
  return http.request({
    url: '/huajian/common/getPanShareTagsList',
    method: 'get'
  });
};

// 查询网盘分享列表，不查询详细信息
export const getPanShareListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/common/getPanShareList',
    method: 'get',
    params: params
  });
};

// 管理员审核网盘资源
export const auditPanShareByAdminAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/panShare/auditPanShareByAdmin',
    method: 'post',
    data: data
  });
};

// 用户查询单个网盘资源，不带下载链接
export const getPanShareDetailByIdAsync: any = (params: any) => {
  return http.request({
    url: `/huajian/common/getPanShareDetailById/${params.id}`,
    method: 'get'
  });
};
