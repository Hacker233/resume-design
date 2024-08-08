import http from '../request';

// 查询会员列表
export const getMembershipListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/memberships/getMembershipList',
    method: 'get',
    params: params
  });
};

// 管理员新增会员
export const createMembershipAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/memberships/createMembership',
    method: 'post',
    data: data
  });
};

// 管理员删除用户会员记录
export const deleteMembershipAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/memberships/deleteMembership/${id}`,
    method: 'delete'
  });
};

// 管理员更新会员记录
export const updateMembershipAsync: any = (id: string, data: any) => {
  return http.request({
    url: `/huajian/memberships/updateMembership/${id}`,
    method: 'put',
    data: data
  });
};

// 查询用户会员信息
export const getUserMembershipAsync: any = () => {
  return http.request({
    url: '/huajian/memberships/getUserMembership',
    method: 'get'
  });
};

// 管理员获取会员配置列表
export const getMembershipConfigsAsync: any = () => {
  return http.request({
    url: '/huajian/memberships/getMembershipConfigs',
    method: 'get'
  });
};

// 管理员更新会员配置
export const updateMembershipConfigAsync: any = (id: string, data: any) => {
  return http.request({
    url: `/huajian/memberships/updateMembershipConfig/${id}`,
    method: 'put',
    data: data
  });
};

// 管理员新增会员配置项
export const createMembershipConfigAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/memberships/createMembershipConfig',
    method: 'post',
    data: data
  });
};

// 管理员删除会员配置项
export const deleteMembershipConfigAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/memberships/deleteMembershipConfig/${id}`,
    method: 'delete'
  });
};

// 用户获取会员配置列表
export const getMembershipConfigsByUserAsync: any = () => {
  return http.request({
    url: '/huajian/common/getMembershipConfigsByUser',
    method: 'get'
  });
};
