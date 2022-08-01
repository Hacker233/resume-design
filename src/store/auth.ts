import { getToken, setToken as cacheToken } from '@/utils/storage';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('authStore', () => {
  const token = ref(getToken());
  // 是否显示弹层
  const isShowModal = ref(false);
  const isLogin = computed(() => (token.value ? true : false));

  const setToken = (value: string) => {
    token.value = value;
    cacheToken(value);
  };

  const setIsShowModal = (value: boolean) => {
    console.log('set', value);
    isShowModal.value = value;
  };

  return {
    token,
    isLogin,
    isShowModal,
    setIsShowModal,
    setToken
  };
});
