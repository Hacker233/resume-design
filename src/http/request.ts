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

const http: any = new Request({
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

      let errorMessage = '';
      if (status) {
        errorMessage = errorMessages[status as number] || `连接出错(${status || '服务端错误'})!`;

        // 添加具体错误信息
        const serverMessage = error.response?.data?.message;
        if (serverMessage) {
          errorMessage += `: ${serverMessage}`;
        }

        // 网络错误特殊处理
        if (error.message === 'Network Error') {
          errorMessage = '网络连接异常，请检查网络设置';
        }

        console.error('请求错误:', error);
        ElMessage.error({
          message: errorMessage,
          duration: 5000,
          showClose: true
        });
      } else {
        // 非HTTP状态错误
        errorMessage = error.message || '请求发生未知错误';
        ElMessage.error({
          message: errorMessage,
          duration: 5000,
          showClose: true
        });
      }

      return Promise.reject(error);
    }
  }
});

/**
 * 流式请求方法
 * @param url 请求地址
 * @param data 请求数据
 * @param onMessage 接收到数据时的回调
 * @param onError 发生错误时的回调
 * @returns AbortController 用于取消请求
 */
http.streamRequest = (
  url: string,
  data: any,
  onMessage: (chunk: string | object) => void,
  onError: (error: any) => void,
  onComplete?: () => void // 新增完成回调
): AbortController => {
  const controller = new AbortController();
  const signal = controller.signal;

  fetch(`${CONFIG.serverAddress}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${appStore.useTokenStore.token}`
    },
    body: JSON.stringify(data),
    signal
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              onComplete?.(); // 流式传输结束时触发完成回调
              break;
            }
            const chunk = decoder.decode(value);
            onMessage(chunk);
          }
        } catch (error) {
          onError(error);
        }
      }
    })
    .catch((error) => {
      onError(error);
    });

  return controller;
};

export default http;
