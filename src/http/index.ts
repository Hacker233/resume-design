import axios, { AxiosResponse, AxiosError, AxiosRequestConfig, AxiosInstance } from 'axios';
import type { RequestConfig, RequestInterceptors } from './types/types';
import qs from 'qs';

class Request {
  instance: AxiosInstance;
  interceptorsObj?: RequestInterceptors<AxiosResponse>;
  cancelRequestSourceList: Map<string, AbortController> = new Map();
  requestUrlList: Set<string> = new Set();

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptorsObj = config.interceptors;

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 在此处添加请求拦截逻辑
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    if (this.interceptorsObj) {
      this.instance.interceptors.request.use(
        this.interceptorsObj.requestInterceptors,
        this.interceptorsObj.requestInterceptorsCatch
      );
      this.instance.interceptors.response.use(
        this.interceptorsObj.responseInterceptors,
        this.interceptorsObj.responseInterceptorsCatch
      );
    }

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: AxiosError) => {
        // 错误处理
        const status = error.response?.status;
        const errorMessages: Record<number, string> = {
          400: '请求错误(400)',
          401: '未授权，请重新登录(401)',
          403: '拒绝访问(403)',
          404: '请求出错(404)',
          408: '请求超时(408)',
          500: '服务器错误(500)',
          501: '服务未实现(501)',
          502: '网络错误(502)',
          503: '服务不可用(503)',
          504: '网络超时(504)',
          505: 'HTTP版本不受支持(505)'
        };
        const message = errorMessages[status as number] || `连接出错(${status})!`;
        console.error('HTTP Error:', message, error.response);
        return Promise.reject(error);
      }
    );
  }

  private getSourceIndex(url: string): number {
    return Array.from(this.cancelRequestSourceList.keys()).indexOf(url);
  }

  private delUrl(url: string) {
    this.requestUrlList.delete(url);
    this.cancelRequestSourceList.delete(url);
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }

      const url = config.url;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort(); // 超时取消请求
      }, 60000); // 60秒

      if (url) {
        this.requestUrlList.add(url);
        this.cancelRequestSourceList.set(url, controller);
      }

      config.signal = controller.signal;

      if (!config.headers) {
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
      }

      if (config.method === 'post' && config.headers['Content-Type'] !== 'application/json') {
        config.data = qs.stringify(config.data);
      }

      if (localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token') as string;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          clearTimeout(timeoutId); // 请求成功，清除定时器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }
          resolve(res);
        })
        .catch((error: AxiosError) => {
          clearTimeout(timeoutId); // 请求失败，清除定时器
          reject(error);
        })
        .finally(() => {
          if (url) this.delUrl(url);
        });
    });
  }

  cancelRequest(url: string | string[]) {
    if (typeof url === 'string') {
      const controller = this.cancelRequestSourceList.get(url);
      controller?.abort();
    } else {
      url.forEach((u) => {
        const controller = this.cancelRequestSourceList.get(u);
        controller?.abort();
      });
    }
  }

  cancelAllRequest() {
    this.cancelRequestSourceList.forEach((controller) => {
      controller.abort();
    });
  }
}

export default Request;
export { RequestConfig, RequestInterceptors };
