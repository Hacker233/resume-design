import http from '../request';

// 新增网站分享类型
export const addWebsiteTypeAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/websiteShare/addWebsiteType',
    method: 'post',
    data: data
  });
};

// 更新网站分享类型
export const updateWebsiteTypeAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/websiteShare/updateWebsiteType',
    method: 'post',
    data: data
  });
};

// 查询网站分享类型
export const getWebsiteTypeListAsync: any = () => {
  return http.request({
    url: '/huajian/common/getWebsiteTypeList',
    method: 'get'
  });
};

// 删除网站类型
export const deleteWebsiteTypeAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/websiteShare/deleteWebsiteType/${id}`,
    method: 'delete'
  });
};

// 新增网站分享分类
export const addWebsiteCategoryAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/websiteShare/addWebsiteCategory',
    method: 'post',
    data: data
  });
};

// 更新网站分享分类
export const updateWebsiteCategoryAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/websiteShare/updateWebsiteCategory',
    method: 'post',
    data: data
  });
};

// 查询网站分享分类
export const getWebsiteCategoryListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/common/getWebsiteCategoryList',
    method: 'get',
    params: params
  });
};

// 管理员分页查询网站分享分类
export const getWebsiteCategoryListPageAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/websiteShare/getWebsiteCategoryList',
    method: 'get',
    params: params
  });
};

// 删除软件分类
export const deleteWebsiteCategoryAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/websiteShare/deleteWebsiteCategory/${id}`,
    method: 'delete'
  });
};

// 查询网站分享列表--分页查询
export const getWebsiteListPageAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/websiteShare/getWebsiteListPage',
    method: 'get',
    params: params
  });
};

// 新增网站分享
export const addWebsiteAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/websiteShare/addWebsite',
    method: 'post',
    data: data
  });
};

// 更新网站分享分类
export const updateWebsiteAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/websiteShare/updateWebsite',
    method: 'post',
    data: data
  });
};

// 删除网站分享
export const deleteWebsiteAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/websiteShare/deleteWebsite/${id}`,
    method: 'delete'
  });
};

// 根据网站类型查询出所有网站列表
export const getWebsiteListByTypeAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/common/getWebsiteListByType',
    method: 'get',
    params: params
  });
};

// 根据id查询网站详细信息
export const getWebsiteInfoAsync: any = (params: any) => {
  return http.request({
    url: `/huajian/common/getWebsiteInfo/${params.id}`,
    method: 'get'
  });
};

// 根据网站类型和分类查询出网站列表
export const getWebsiteListByTypeAndCategoryAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/common/getWebsiteListByTypeAndCategory',
    method: 'get',
    params: params
  });
};

// 网站浏览量+1
export const addWebsiteViewByIdAsync: any = (params: any) => {
  return http.request({
    url: `/huajian/common/addWebsiteViewById/${params.id}`,
    method: 'get'
  });
};
