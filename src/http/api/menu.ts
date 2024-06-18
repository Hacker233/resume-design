import http from '../request';

// 查询首页菜单列表
export const getIndexMenuListAsync: any = () => {
  return http.request({
    url: '/huajian/common/getIndexMenuList',
    method: 'get'
  });
};

// 新增一个菜单
export const addIndexMenuAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/menu/addIndexMenu',
    method: 'post',
    data: data
  });
};

// 更新菜单
export const updateIndexMenuAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/menu/updateIndexMenu',
    method: 'put',
    data: data
  });
};

// 删除菜单以及所有子菜单
export const deleteIndexMenuAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/menu/deleteIndexMenu/${id}`,
    method: 'delete'
  });
};

// 查询管理页菜单列表
export const getAdminMenuListAsync: any = () => {
  return http.request({
    url: '/huajian/menu/getAdminMenuList',
    method: 'get'
  });
};

// 新增一个管理页菜单
export const addAdminMenuAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/menu/addAdminMenu',
    method: 'post',
    data: data
  });
};

// 更新菜单
export const updateAdminMenuAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/menu/updateAdminMenu',
    method: 'put',
    data: data
  });
};

// 删除菜单以及所有子菜单
export const deleteAdminMenuAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/menu/deleteAdminMenu/${id}`,
    method: 'delete'
  });
};
