import http from '../request';

// 管理员获取用户简历列表
export const getAllUserResumeListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/userresume/getAllUserResumeList',
    method: 'get',
    params: params
  });
};

// 管理员删除用户简历
export const deleteUserResumeByAdminAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/userresume/deleteUserResume',
    method: 'delete',
    params: params
  });
};
