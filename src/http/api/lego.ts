import http from '../request';

// 查询用户相关数据
export const legoUserResumeAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/lego/legoUserResume',
    method: 'post',
    data: data
  });
};

// 查询个人积木创作列表
export const legoUserResumeListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/lego/legoUserResumeList',
    method: 'get',
    params: params
  });
};

// 用户查询个人单个积木数据
export const getLegoUserResumeByIdAsync: any = (params: { id: any }) => {
  return http.request({
    url: `/huajian/lego/legoUserResumeById/${params.id}`,
    method: 'get'
  });
};

// 用户删除个人积木作品
export const deleteLegoUserResumeAsync: any = (params: { id: any }) => {
  return http.request({
    url: `/huajian/lego/deleteLegoUserResume/${params.id}`,
    method: 'delete'
  });
};
