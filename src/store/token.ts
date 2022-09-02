import { defineStore } from 'pinia';

// 用户信息
export const useTokenStore = defineStore('tokenStore', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  function saveToken(tokenStr: string) {
    token.value = tokenStr;
    localStorage.setItem('token', token.value);
  }
  return {
    token,
    saveToken
  };
});
