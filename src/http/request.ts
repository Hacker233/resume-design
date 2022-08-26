import Request from './index';
import { AxiosResponse } from 'axios';
const http = new Request({
  baseURL: 'https://smallpig.site/api',
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => config,
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      return result;
    }
  }
});
export default http;
