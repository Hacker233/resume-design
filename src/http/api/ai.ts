import http from '../request';

// 请求AI
export const aiInvokeAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/ai/invoke',
    method: 'post',
    data: data
  });
};

// 取消请求
export const cancleAiInvokeAsync: any = () => {
  return http.cancelRequest('/huajian/ai/invoke');
};

// 查询AI模型列表
export const aiModelListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/ai/getModelList',
    method: 'get',
    params: params
  });
};

// 新增模型
export const addModelAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/ai/addModel',
    method: 'post',
    data: data
  });
};

// 修改模型
export const updateModelAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/ai/updateIntegralPayConfig',
    method: 'post',
    data: data
  });
};

// 删除模型
export const deleteModelAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/ai/deleteModel/${id}`,
    method: 'delete'
  });
};

// AI润色
export const polishTextAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/ai/polishText',
    method: 'post',
    data: data
  });
};

// AI创作
export const createTextAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/ai/createText',
    method: 'post',
    data: data
  });
};

// AI翻译
export const translateTextAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/ai/translateText',
    method: 'post',
    data: data
  });
};

// 取消AI请求
export const cancleAiTranslateTextAsync: any = () => {
  return http.cancelRequest('/huajian/ai/translateText');
};
