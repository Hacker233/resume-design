import Request from './index';
import { AxiosResponse } from 'axios';
import CONFIG from '@/config/index';
import appStore from '@/store';
const http = new Request({
  baseURL: CONFIG.serverAddress,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => {
      config.validateStatus = (status) => {
        switch (status) {
          case 401:
            ElMessage.error('用户信息过期或无权限，请重新登录');
            const { saveToken } = appStore.useTokenStore;
            const { saveUserInfo } = appStore.useUserInfoStore;
            const { setUuid } = appStore.useRefreshStore;
            const router = useRouter();
            saveToken(''); // 清除token
            saveUserInfo(''); // 清除用户信息
            setUuid(); // 全局刷新
            router.push('/');
            break;
          default:
            break;
        }
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
export default http;
