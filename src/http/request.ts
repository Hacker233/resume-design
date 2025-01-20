import Request from './index';
import { AxiosResponse } from 'axios';
import CONFIG from '@/config/index';
import appStore from '@/store';
import LoginDialog from '@/components/LoginDialog/LoginDialog';
import { ElMessage } from 'element-plus';

const handleUnauthorized = () => {
  const { saveToken } = appStore.useTokenStore;
  const { saveUserInfo } = appStore.useUserInfoStore;
  const { setUuid } = appStore.useRefreshStore;

  saveToken(''); // 清除token
  saveUserInfo(''); // 清除用户信息
  setUuid(); // 全局刷新
  LoginDialog(true); // 显示登录对话框
};

const http = new Request({
  baseURL: CONFIG.serverAddress,
  timeout: 1000 * 60 * 5,
  interceptors: {
    requestInterceptors: (config) => {
      config.validateStatus = (status) => {
        if (status === 401) {
          handleUnauthorized();
        }
        return status >= 200 && status < 400;
      };
      return config;
    },
    responseInterceptors: (response: AxiosResponse) => {
      return response;
    },
    responseInterceptorsCatch: (error: any) => {
      // 错误处理
      const status = error.response?.status;
      const errorMessages: Record<number, string> = {
        400: '请求错误(400)',
        401: '请登录网站',
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
      if (status) {
        const message = errorMessages[status as number] || `连接出错(${status || '服务端错误'})!`;
        console.log('error111', error);
        ElMessage.error(message);
      }
      return Promise.reject(error);
    }
  }
});

export default http;
