import http from '../request';

// 查询用户简币
export const getUserIntegralTotalAsync: any = () => {
  return http.request({
    url: '/huajian/integral/getUserIntegralTotal',
    method: 'get'
  });
};

// 添加用户简币信息
export const addIntegralLogAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/integral/addIntegralLog',
    method: 'post',
    data: data
  });
};

// 查询用户简币日志
export const getUserIntegralLogsAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/integral/getUserIntegralLogs',
    method: 'get',
    params: params
  });
};

// 用户消费简币
export const payIntegralLogAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/integral/payIntegralLog',
    method: 'post',
    data: data
  });
};

// 查询用户是否消费过该资源
export const getUserIsPayGoodsAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/integral/getUserIsPayGoods',
    method: 'get',
    params: params
  });
};

// 获取今日签到总人数
export const getTodayAttendancePersonTotalAsync: any = () => {
  return http.request({
    url: '/huajian/common/getTodayAttendancePersonTotal',
    method: 'get'
  });
};

// 管理员查询所有简币列表
export const getAllIntegralListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/integral/getAllIntegralList',
    method: 'get',
    params: params
  });
};

// 管理员删除简币记录
export const integralDeleteAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/integral/integralDelete/${id}`,
    method: 'delete'
  });
};

// 管理员添加简币记录
export const addIntegralLogByAdminAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/integral/addIntegralLogByAdmin',
    method: 'post',
    data: data
  });
};
