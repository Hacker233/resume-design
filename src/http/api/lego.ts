import http from '../request';

// 查询用户相关数据
export const legoUserResumeAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/lego/legoUserResume',
    method: 'post',
    data: data
  });
};
