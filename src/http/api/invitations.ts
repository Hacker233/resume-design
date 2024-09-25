import http from '../request';

// 获取专属邀请码
export const getInviteCodeAsync: any = () => {
  return http.request({
    url: '/huajian/invitations/getInviteCode',
    method: 'get'
  });
};
