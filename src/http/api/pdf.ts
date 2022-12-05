import http from '../custom';

// 查询菜单列表
export const getCustomPdfAsync: any = (params: any) => {
  return http.request({
    url: 'http://localhost:3000/generate-pdf',
    method: 'get',
    params: params
  });
};
