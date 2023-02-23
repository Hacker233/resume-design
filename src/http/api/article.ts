import http from '../request';

// 新增文章分类
export const addArticleCategoryAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/article/articleCategoryAdd',
    method: 'post',
    data: data
  });
};

// 查询文章分类列表
export const getArticleCategoryListAsync: any = () => {
  return http.request({
    url: '/huajian/article/getArticleCategoryList',
    method: 'get'
  });
};

// 修改文章分类
export const articleCategoryUpdateAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/article/articleCategoryUpdate',
    method: 'put',
    data: data
  });
};

// 删除文章分类
export const articleCategoryDeleteAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/article/articleCategoryDelete/${id}`,
    method: 'delete'
  });
};

// 发布文章
export const articleAddAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/article/articleAdd',
    method: 'post',
    data: data
  });
};

// 管理员查询所有文章列表
export const articleAllListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/article/articleAllList',
    method: 'get',
    params: params
  });
};

// 管理员删除文章
export const articleDeleteAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/article/articleDelete/${id}`,
    method: 'delete'
  });
};

// 查询单条文章信息
export const getArticleInfoAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/article/getArticleInfo/${id}`,
    method: 'get'
  });
};

// 更新文章
export const articleUpdateAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/article/articleUpdate',
    method: 'post',
    data: data
  });
};

// 用户查询文章列表
export const userGetArticleListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/article/userGetArticleList',
    method: 'get',
    params: params
  });
};

// 查询用户是否付费过，即是否有查看权限
