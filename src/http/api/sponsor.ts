import http from '../request';

// 新增赞助
export const sponsorAddAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/common/addSponsor',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  });
};

// 查询赞助列表
export const getSponsorListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/common/getSponsorList',
    method: 'get',
    params: params
  });
};

// 管理员删除赞助
export const deleteSponsorAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/sponsor/deleteSponsor/${id}`,
    method: 'delete'
  });
};

// 管理员审核赞助
export const auditSponsorAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/paystats/auditSponsor',
    method: 'post',
    data: data
  });
};
