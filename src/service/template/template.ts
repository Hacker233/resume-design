import http from '@/service/index';

export const getTemplateJson: any = (url: string) => {
  return http.get(url);
};
