import Request from './index';
import { AxiosResponse } from 'axios';
import CONFIG from '@/config/index';
import appStore from '@/store';
import LoginDialog from '@/components/LoginDialog/LoginDialog';
import { ElMessage } from 'element-plus';

const handleUnauthorized = () => {
  ElMessage.error('用户信息过期或无权限，请重新登录');
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
      ElMessage.error(error.message || '请求失败，请稍后再试');
      return Promise.reject(error);
    }
  }
});

export default http;
