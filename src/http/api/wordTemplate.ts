import http from '../request';

// 管理员添加分类
export const wordCategoryAddAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/word/wordCategoryAdd',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};

// 查询word分类
export const getWordCategoryListAsync: any = () => {
  return http.request({
    url: '/huajian/common/getWordCategoryList',
    method: 'get'
  });
};

// 更新word分类
export const wordCategoryUpdateAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/word/wordCategoryUpdate',
    method: 'put',
    data: data
  });
};

// 删除分类
export const wordCategoryDeleteAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/word/wordCategoryDelete/${id}`,
    method: 'delete'
  });
};

// 新增word模板
export const wordAddAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/wordTemplate/wordAdd',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};

// 查询word模板列表
export const wordListAsync: any = () => {
  return http.request({
    url: '/huajian/wordTemplate/wordList',
    method: 'get'
  });
};

// 删除word模板
export const deleteWordAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/wordTemplate/deleteWord/${id}`,
    method: 'delete'
  });
};

// 更新模板
export const updateWordAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/wordTemplate/updateWord',
    method: 'put',
    data: data
  });
};

// 查询word模板列表，不查询详细信息
export const getWordTemplateListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/common/getWordTemplateList',
    method: 'get',
    params: params
  });
};

// 查询单个word模板详细信息
export const getWordTemplateInfoAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/common/getWordTemplateInfo/${id}`,
    method: 'get'
  });
};

// 获取word模板下载链接
export const wordDownloadUrl: any = (id: string) => {
  return http.request({
    url: `/huajian/wordTemplate/wordDownloadUrl/${id}`,
    method: 'get'
  });
};

// 查询所有标签列表
export const getWordTemplateTagsListAsync: any = () => {
  return http.request({
    url: '/huajian/common/getWordTemplateTagsList',
    method: 'get'
  });
};
