import http from '../request';

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

// 流式AI润色
export const polishTextStreamAsync: any = (
  data: any,
  onMessage: (chunk: string) => void,
  onError: (error: any) => void,
  onComplete?: () => void // 新增 onComplete 回调
) => {
  return http.streamRequest(
    '/huajian/ai/polishTextStream',
    data,
    onMessage,
    onError,
    onComplete // 传递 onComplete 回调
  );
};

// 取消流式AI润色
export const cancelPolishTextStreamAsync: any = (controller: AbortController) => {
  controller.abort(); // 取消请求
};

// AI创作（流式传输）
export const createTextStreamAsync: any = (
  data: any,
  onMessage: (chunk: string) => void,
  onError: (error: any) => void,
  onComplete?: () => void // 新增 onComplete 回调
) => {
  return http.streamRequest(
    '/huajian/ai/createTextStream',
    data,
    onMessage,
    onError,
    onComplete // 传递 onComplete 回调
  );
};

// 取消流式AI创作
export const cancelCreateTextStreamAsync: any = (controller: AbortController) => {
  controller.abort(); // 取消请求
};

// 查询AI润色需要的简币数量
export const getPolishIntegralAsync: any = () => {
  return http.request({
    url: '/huajian/ai/getPolishIntegral',
    method: 'get'
  });
};

// 查询AI创作需要的简币数量
export const getCreateIntegralAsync: any = () => {
  return http.request({
    url: '/huajian/ai/getCreateIntegral',
    method: 'get'
  });
};

// 查询简历润色模型列表
export const getPolishModelListAsync: any = () => {
  return http.request({
    url: '/huajian/ai/getPolishModelList',
    method: 'get'
  });
};

// 查询简历创作模型列表
export const getCreateModelListAsync: any = () => {
  return http.request({
    url: '/huajian/ai/getCreateModelList',
    method: 'get'
  });
};
