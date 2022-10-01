import Request from './index';
import { AxiosResponse } from 'axios';
const baiduHttp = new Request({
  baseURL: 'https://data.zz.baidu.com',
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => {
      return config;
    },
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      return result;
    }
  }
});
export default baiduHttp;
