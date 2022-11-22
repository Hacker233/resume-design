import Request from './index';
import { AxiosResponse } from 'axios';
import CONFIG from '@/config/index';
const smallpigHttp = new Request({
  baseURL: CONFIG.smallpigAddress,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => {
      config.validateStatus = (status) => {
        return status >= 200 && status < 400;
      };
      return config;
    },
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      return result;
    }
  }
});
export default smallpigHttp;
