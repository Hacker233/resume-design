import http from '../request';

// 新增模板
export const addTemplateAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/resume/addTemplate',
    method: 'post',
    data: data
  });
};

// 更新模板
export const updateTemplateAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/resume/updateTemplate',
    method: 'put',
    data: data
  });
};

// 删除模板
export const deleteTemplateAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/resume/deleteTemplate/${id}`,
    method: 'delete'
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
    method: 'get'
  });
};

// 查询单个简历模板数据
export const getResetTemplateInfoAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/resume/templateReset/${id}`,
    method: 'get'
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

// 查询模板列表全部数据
export const getResumeListAllAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/resume/templateListAll',
    method: 'get',
    params: params
  });
};

// 用户删除自己的简历
export const deleteUserResumeAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/userresume/deleteResume/${id}`,
    method: 'delete'
  });
};

// 导出为pdf
export const getResumePdfAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/pdf/getPdf',
    method: 'post',
    responseType: 'blob',
    data: params
  });
};

// 导出为PNG
export const getPNGAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/pdf/getPNG',
    method: 'get',
    responseType: 'blob',
    params: params
  });
};

// 增加resume导出次数
export const addMakeResumeCountAsync: any = () => {
  return http.request({
    url: '/huajian/pdf/addMakeResumeCount',
    method: 'get'
  });
};

// 审核模板
export const auditTemplateAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/resume/auditTemplate',
    method: 'post',
    data: data
  });
};

// 用户查询自己贡献的模板列表
export const getMyContributeTemplateListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/resume/getMyContributeTemplateList',
    method: 'get',
    params: params
  });
};

// 管理员查询模板分类列表
export const getTemplateCategoryListAsync: any = () => {
  return http.request({
    url: '/huajian/resume/getTemplateCategoryList',
    method: 'get'
  });
};

// 新增分类
export const templateCategoryAddAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/resume/templateCategoryAdd',
    method: 'post',
    data: data
  });
};

// 修改分类
export const templateCategoryUpdateAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/resume/templateCategoryUpdate',
    method: 'put',
    data: data
  });
};

// 删除分类
export const templateCategoryDeleteAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/resume/templateCategoryDelete/${id}`,
    method: 'delete'
  });
};
