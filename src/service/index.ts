//http.ts
import axios, { AxiosRequestConfig } from 'axios';

// 设置请求头和请求路径
// axios.defaults.baseURL = '';
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      //@ts-ignore
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return error;
  }
);
// 响应拦截
axios.interceptors.response.use((res) => {
  return res;
});

interface ResType<T> {
  code: number;
  data?: T;
  msg: string;
  err?: string;
}
interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>;
  post<T>(url: string, params?: unknown): Promise<ResType<T>>;
  upload<T>(url: string, params: unknown): Promise<ResType<T>>;
  download(url: string): void;
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  download(url) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    iframe.onload = function () {
      document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
  }
};
export default http;
