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
