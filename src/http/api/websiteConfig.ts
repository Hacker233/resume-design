import http from '../request';

// 更新网站配置
export const webConfigUpdateAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/websiteConfig/webConfigUpdate',
    method: 'put',
    data: data
  });
};

// 查询网站配置
export const getWebsiteConfigAsync: any = () => {
  return http.request({
    url: '/huajian/common/getWebsiteConfig',
    method: 'get'
  });
};

export const resetWebsiteConfigAsync: any = () => {
  return http.request({
    url: '/huajian/websiteConfig/resetWebsiteConfig',
    method: 'post'
  });
};
