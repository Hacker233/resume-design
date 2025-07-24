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

// 组织管理员查询区间范围用户注册数
export const getOrgSignUsersByDateAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/panel/getOrgSignUsersByDate',
    method: 'get',
    params: params
  });
};

// 查询收入占比
export const getPercentageRevenueAsync: any = () => {
  return http.request({
    url: '/huajian/panel/getPercentageRevenue',
    method: 'get'
  });
};

// 组织管理员查询区间范围的收入占比
export const getOrgPercentageRevenueAsync: any = () => {
  return http.request({
    url: '/huajian/panel/getOrgPercentageRevenue',
    method: 'get'
  });
};

// 查询区间范围的收入情况
export const getIncomeByDateAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/panel/getIncomeByDate',
    method: 'get',
    params: params
  });
};

// 组织管理员查询区间范围的收入情况
export const getOrgIncomeByDateAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/panel/getOrgIncomeByDate',
    method: 'get',
    params: params
  });
};

// 查询区间范围的易支付收入情况
export const getWxIncomeByDateAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/panel/getWxIncomeByDate',
    method: 'get',
    params: params
  });
};

// 组织管理员查询区间范围的易支付收入情况
export const getOrgWxIncomeByDateAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/panel/getOrgWxIncomeByDate',
    method: 'get',
    params: params
  });
};

// 查询区间范围的支付宝收入情况
export const getAliIncomeByDateAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/panel/getAliIncomeByDate',
    method: 'get',
    params: params
  });
};

// 组织管理员查询区间范围的支付宝收入情况
export const getOrgAliIncomeByDateAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/panel/getOrgAliIncomeByDate',
    method: 'get',
    params: params
  });
};

// 查询区间范围的签到人数
export const getAttendanceNumberAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/panel/getAttendanceNumber',
    method: 'get',
    params: params
  });
};

// 组织管理员查询区间范围的签到人数
export const getOrgAttendanceNumberAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/panel/getOrgAttendanceNumber',
    method: 'get',
    params: params
  });
};
