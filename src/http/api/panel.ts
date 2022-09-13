import http from '../request';

// 查询用户相关数据
export const getUserPanelAsync: any = () => {
  return http.request({
    url: '/huajian/panel/userPanel',
    method: 'get'
  });
};
