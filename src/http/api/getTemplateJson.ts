import http from '../request';

export const getTemplateJson: any = (url: string) => {
  return http.request({
    url: url,
    method: 'get'
  });
};
