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

// 查询AI简历优化需要的简币数量
export const getOptimizeResumeIntegralAsync: any = () => {
  return http.request({
    url: '/huajian/ai/getOptimizeResumeIntegral',
    method: 'get'
  });
};

// 查询AI简历诊断上传文件需要的简币数量
export const getOptimizeResumeUploadIntegralAsync: any = () => {
  return http.request({
    url: '/huajian/ai/getDiagnoseResumeIntegral',
    method: 'get'
  });
};

// 查询AI简历智能生成需要的简币数量
export const getGenerateResumeIntegralAsync: any = () => {
  return http.request({
    url: '/huajian/ai/getGenerateResumeIntegral',
    method: 'get'
  });
};

// 查询AI简历优化支持的模型列表
export const getOptimizeResumeModelListAsync: any = () => {
  return http.request({
    url: '/huajian/ai/getOptimizeResumeModelList',
    method: 'get'
  });
};

// 查询AI简历智能生成支持的模型列表
export const getGenerateResumeModelListAsync: any = () => {
  return http.request({
    url: '/huajian/ai/getGenerateResumeModelList',
    method: 'get'
  });
};

// 流式传输AI简历优化文本
export const optimizeResumeStreamAsync: any = (
  data: any,
  onMessage: (chunk: string) => void,
  onError: (error: any) => void,
  onComplete?: () => void
) => {
  return http.streamRequest(
    '/huajian/ai/optimizeResumeStream',
    data,
    onMessage,
    onError,
    onComplete
  );
};

// 取消流式传输AI简历优化文本
export const cancelOptimizeResumeStreamAsync: any = (controller: AbortController) => {
  controller.abort(); // 取消请求
};

// 查询用户AI简历诊断列表
export const getAiOptimizeLogsListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/ai/getAiOptimizeLogsList',
    method: 'get',
    params: params
  });
};

// AI生成简历（流式传输）
export const generateResumeStreamAsync: any = (
  data: any, // 生成简历的参数
  onMessage: (chunk: string) => void, // 流式数据回调
  onError: (error: any) => void, // 错误回调
  onComplete?: () => void // 完成回调
) => {
  return http.streamRequest(
    '/huajian/ai/generateResumeStream', // 后端接口路径
    data, // 请求参数
    onMessage, // 流式数据回调
    onError, // 错误回调
    onComplete // 完成回调
  );
};

// AI生成Markdown简历（流式传输）
export const generateMarkdownResumeStreamAsync: any = (
  data: any, // 生成简历的参数
  onMessage: (chunk: string) => void, // 流式数据回调
  onError: (error: any) => void, // 错误回调
  onComplete?: () => void // 完成回调
) => {
  return http.streamRequest(
    '/huajian/ai/generateMDResumeStream', // 后端接口路径
    data, // 请求参数
    onMessage, // 流式数据回调
    onError, // 错误回调
    onComplete // 完成回调
  );
};

// 取消流式传输AI生成简历
export const cancelGenerateResumeStreamAsync: any = (controller: AbortController) => {
  controller.abort(); // 取消请求
};

// AI json转md
// AI生成简历（流式传输）
export const jsonToMarkdownStreamByAiAsync: any = (
  data: any, // 生成简历的参数
  onMessage: (chunk: string) => void, // 流式数据回调
  onError: (error: any) => void, // 错误回调
  onComplete?: () => void // 完成回调
) => {
  return http.streamRequest(
    '/huajian/ai/jsonToMarkdownStreamByAi', // 后端接口路径
    data, // 请求参数
    onMessage, // 流式数据回调
    onError, // 错误回调
    onComplete // 完成回调
  );
};

// 取消流式传输AI转markdown
export const cancelToMarkdownStreamAsync: any = (controller: AbortController) => {
  controller.abort(); // 取消请求
};

// 获取流水号
export const getSerialNumberAsync: any = () => {
  return http.request({
    url: '/huajian/ai/getSerialNumber',
    method: 'get'
  });
};

// AI模型调用失败回调
export const aiFailAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/ai/aiFail',
    method: 'post',
    data: data
  });
};

// 管理员扉页查询AI日志调用列表
export const getAiLogsByAdminAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/ai/getAiLogsByAdmin',
    method: 'get',
    params: params
  });
};

// 传入文本简历进行AI诊断
export const aiOptimizeResumeByPdfTextStreamAsync: any = (
  data: any, // 生成简历的参数
  onMessage: (chunk: string) => void, // 流式数据回调
  onError: (error: any) => void, // 错误回调
  onComplete?: () => void // 完成回调
) => {
  return http.streamRequest(
    '/huajian/ai/aiOptimizeResumeByPdfTextStream', // 后端接口路径
    data, // 请求参数
    onMessage, // 流式数据回调
    onError, // 错误回调
    onComplete // 完成回调
  );
};
