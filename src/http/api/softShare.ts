import http from '../request';

// 查询软件列表
export const getSoftShareListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/softShare/getSoftShareList',
    method: 'get',
    params: params
  });
};

// 新增软件
export const addSoftAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/softShare/addSoft',
    method: 'post',
    data: data
  });
};

// 更新软件
export const updateSoftAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/softShare/updateSoft',
    method: 'post',
    data: data
  });
};

// 删除软件
export const deleteSoftAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/softShare/deleteSoft/${id}`,
    method: 'delete'
  });
};

// 新增软件分享分类
export const addSoftCategoryAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/softShare/addSoftCategory',
    method: 'post',
    data: data
  });
};

// 更新软件分享分类
export const updateSoftCategoryAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/softShare/updateSoftCategory',
    method: 'post',
    data: data
  });
};

// 查询软件分类
export const getSoftCategoryListAsync: any = () => {
  return http.request({
    url: '/huajian/common/getSoftCategoryList',
    method: 'get'
  });
};

// 删除软件分类
export const deleteSoftCategoryAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/softShare/deleteSoftCategory/${id}`,
    method: 'delete'
  });
};

// 用户查询软件列表
export const getSoftShareCardListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/common/getSoftShareCardList',
    method: 'get',
    params: params
  });
};

// 用户查询单个软件资源，不带下载链接
export const getSoftDetailByIdAsync: any = (params: any) => {
  return http.request({
    url: `/huajian/common/getSoftDetailById/${params.id}`,
    method: 'get'
  });
};

// 获取软件下载链接
export const softDownloadUrl: any = (id: string) => {
  return http.request({
    url: `/huajian/softShare/softDownloadUrl/${id}`,
    method: 'get'
  });
};
