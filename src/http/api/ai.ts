import http from '../request';

// 请求AI
export const aiInvokeAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/ai/invoke',
    method: 'post',
    data: data
  });
};
