import http from '../request';

// 查询用户相关数据
export const legoUserResumeAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/lego/legoUserResume',
    method: 'post',
    data: data
  });
};

// 查询个人积木创作列表
export const legoUserResumeListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/lego/legoUserResumeList',
    method: 'get',
    params: params
  });
};

// 用户查询个人单个积木数据
export const getLegoUserResumeByIdAsync: any = (params: { id: any }) => {
  return http.request({
    url: `/huajian/lego/legoUserResumeById/${params.id}`,
    method: 'get'
  });
};

// 用户删除个人积木作品
export const deleteLegoUserResumeAsync: any = (params: { id: any }) => {
  return http.request({
    url: `/huajian/lego/deleteLegoUserResume/${params.id}`,
    method: 'delete'
  });
};

// 新增积木分类
export const addLegoCategoryAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/legoCategory/legoCategoryAdd',
    method: 'post',
    data: data
  });
};

// 查询积木分类列表
export const getLegoCategoryListAsync: any = () => {
  return http.request({
    url: '/huajian/legoCategory/getLegoCategoryList',
    method: 'get'
  });
};

// 修改积木分类
export const legoCategoryUpdateAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/legoCategory/legoCategoryUpdate',
    method: 'put',
    data: data
  });
};

// 删除积木分类
export const legoCategoryDeleteAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/legoCategory/legoCategoryDelete/${id}`,
    method: 'delete'
  });
};

// 新增或者更新积木模板
export const legoTemplateAddAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/legoTemplate/legoTemplateAdd',
    method: 'post',
    data: data
  });
};

// 用户查询个人创建的作品模板列表
export const legoUserTemplateListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/legoTemplate/legoUserTemplateList',
    method: 'get',
    params: params
  });
};

// 删除个人积木创作模板
export const deleteLegoUserTemplateAsync: any = (params: { id: any }) => {
  return http.request({
    url: `/huajian/legoTemplate/deleteLegoUserTemplate/${params.id}`,
    method: 'delete'
  });
};
