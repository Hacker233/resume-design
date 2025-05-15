import http from '../request';

// 查询用户相关数据
export const getUserPanelAsync: any = () => {
  return http.request({
    url: '/huajian/panel/userPanel',
    method: 'get'
  });
};

// 增加网站访问量
export const addWebsiteViewsAsync: any = () => {
  return http.request({
    url: '/huajian/common/addWebsiteViews',
    method: 'get'
  });
};

// 查询区间范围用户注册数
export const getSignUsersByDateAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/panel/getSignUsersByDate',
    method: 'get',
    params: params
  });
};
