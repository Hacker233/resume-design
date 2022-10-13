import http from '../request';

// 管理员添加分类
export const pptCategoryAddAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/ppt/pptCategoryAdd',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};

// 查询ppt分类
export const getPPTCategoryListAsync: any = () => {
  return http.request({
    url: '/huajian/common/getPPTCategoryList',
    method: 'get'
  });
};

// 更新ppt分类
export const pptCategoryUpdateAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/ppt/pptCategoryUpdate',
    method: 'put',
    data: data
  });
};

// 删除分类
export const pptCategoryDeleteAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/ppt/pptCategoryDelete/${id}`,
    method: 'delete'
  });
};

// 新增ppt模板
export const pptAddAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/pptTemplate/pptAdd',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};

// 查询ppt模板列表
export const pptListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/pptTemplate/pptList',
    method: 'get',
    params: params
  });
};

// 删除ppt模板
export const deletePPTAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/pptTemplate/deletePPT/${id}`,
    method: 'delete'
  });
};

// 更新模板
export const updatePPTAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/pptTemplate/updatePPT',
    method: 'put',
    data: data
  });
};

// 查询ppt模板列表，不查询详细信息
export const getPPTTemplateListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/common/getPPTTemplateList',
    method: 'get',
    params: params
  });
};

// 查询单个ppt模板详细信息
export const getPPTTemplateInfoAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/common/getPPTTemplateInfo/${id}`,
    method: 'get'
  });
};

// 获取ppt模板下载链接
export const pptDownloadUrl: any = (id: string) => {
  return http.request({
    url: `/huajian/pptTemplate/pptDownloadUrl/${id}`,
    method: 'get'
  });
};

// 查询所有标签列表
export const getPPTTemplateTagsListAsync: any = () => {
  return http.request({
    url: '/huajian/common/getPPTTemplateTagsList',
    method: 'get'
  });
};
