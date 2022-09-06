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

// 查询单个简历数据-有草稿则会返回草稿
export const getTemplateInfoAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/resume/template/${id}`,
    method: 'get',
  });
};

// 查询单个简历模板数据
export const getResetTemplateInfoAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/resume/templateReset/${id}`,
    method: 'get',
  });
};

// 保存用户简历
export const updateUserresumeAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/userresume/template',
    method: 'post',
    data: data
  });
};

// 查询用户简历列表
export const getUserResumeListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/userresume/templateList',
    method: 'get',
    params: params
  });
};
