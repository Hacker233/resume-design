import http from '../request';

// 新增模板
export const addTemplateAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/resume/addTemplate',
    method: 'post',
    data: data
  });
};

// 查询模板列表
export const getTemplateListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/common/getTemplateList',
    method: 'get',
    params: params
  });
};

// 查询单个模板数据
export const getTemplateInfoAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/resume/template/${id}`,
    method: 'get',
  });
};
