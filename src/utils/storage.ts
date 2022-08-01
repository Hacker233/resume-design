export enum STROAGE_KEY {
  TOKEN = 'token'
}

/**
 * 缓存数据
 * @author lewinloo
 * @param key
 * @param value
 */
export const setItem = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 获取缓存数据
 * @author lewinloo
 * @param key
 * @returns
 */
export const getItem = <T = unknown>(key: string) => {
  const result = JSON.parse(window.localStorage.getItem(key) ?? 'null');
  if (result) {
    return result as T;
  } else {
    return null;
  }
};

/**
 * 删除缓存数据
 * @author lewinloo
 * @param key
 */
export const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
};

/**
 * 清空 localStorage
 * @author lewinloo
 */
export const clearStorage = () => {
  window.localStorage.clear();
};

/**
 * 保存token
 * @author lewinloo
 */
export const setToken = (token: string) => {
  setItem(STROAGE_KEY.TOKEN, token);
};

/**
 * 获取 token
 * @author lewinloo
 */
export const getToken = () => {
  return getItem<string>(STROAGE_KEY.TOKEN);
};

/**
 * 清除token
 * @author lewinloo
 */
export const clearToken = () => {
  removeItem(STROAGE_KEY.TOKEN);
};
