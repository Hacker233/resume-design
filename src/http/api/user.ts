import http from '../request';

// 登录
interface ILogin {
  email: string;
  password: string;
}
export const loginAsync: any = (data: ILogin) => {
  return http.request({
    url: '/huajian/auth/email/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  });
};

// 注册
interface IRegister {
  name: string;
  email: string;
  password: string;
}
export const registerAsync: any = (data: IRegister) => {
  return http.request({
    url: '/huajian/auth/email/register',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  });
};

// 查询用户信息
export const getUserInfoAsync: any = (email: string) => {
  return http.request({
    url: `/huajian/integral/user/${email}`,
    method: 'get'
  });
};

// 重新发送邮件链接
export const resendVerificationAsync: any = (email: string) => {
  return http.request({
    url: `/huajian/auth/email/resend-verification/${email}`,
    method: 'get'
  });
};

// 忘记密码-发送忘记密码邮件
export const forgetPasswordAsync: any = (email: string) => {
  return http.request({
    url: `/huajian/auth/email/forgot-password/${email}`,
    method: 'get'
  });
};

// 重置密码
export const resetPasswordAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/auth/email/reset-password',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  });
};

// 查询用户列表
export const getAllUserListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/users/getAllUser',
    method: 'get',
    params: params
  });
};

// 管理员更新用户信息
export const updateUserInfoByAdminAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/users/updateUserInfo',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  });
};

// 管理员删除用户
export const deleteUserAsync: any = (email: string) => {
  return http.request({
    url: `/huajian/users/deleteUser/${email}`,
    method: 'delete'
  });
};

// 获取网站分析数据
export const getWebAnalycDataAsync: any = () => {
  return http.request({
    url: '/huajian/common/getWebAnalycData',
    method: 'get'
  });
};

// 修改用户头像
export const updateUserAvatarAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/users/updateAvatar',
    method: 'put',
    data: data
  });
};

// 更新用户个人信息
export const updatePersonInfoAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/users/updatePersonInfo',
    method: 'put',
    data: data
  });
};
