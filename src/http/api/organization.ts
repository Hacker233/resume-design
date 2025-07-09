import http from '../request';

// 查询组织列表
export const getOrgListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/organization/getOrganizationList',
    method: 'get',
    params: params
  });
};

// 管理员新增组织
export const addOrgAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/organization/addOrganization',
    method: 'post',
    data: data
  });
};

// 管理员删除组织
export const deleteOrgAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/organization/deleteOrganization',
    method: 'delete',
    data: data
  });
};

// 管理员更新组织
export const updateOrgAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/organization/updateOrganization',
    method: 'post',
    data: data
  });
};
