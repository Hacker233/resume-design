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

// 发布为线上简历
export const publishOnlineResumeAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/userresume/publishOnline',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  });
};

// 查询用户的在线简历
export const getOnlineResumeAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/common/getOnlineResume/${id}`,
    method: 'get'
  });
};

// 更新在线简历设置
export const updateOnlineResumeAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/userresume/updateOnlineResume',
    method: 'put',
    data: data
  });
};
