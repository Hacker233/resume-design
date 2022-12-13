import { getUserInfoAsync } from '@/http/api/user';
import { defineStore } from 'pinia';

// 用户信息
export const useUserInfoStore = defineStore('userInfoStore', () => {
  const userInfo = ref<any>(
    localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : ''
  );
  function saveUserInfo(userInfoObj: any) {
    userInfo.value = userInfoObj;
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value));
  }

  // 查询用户信息
  async function getAndUpdateUserInfo() {
    const email = userInfo.value ? userInfo.value.email : '';
    const data = await getUserInfoAsync(email);
    if (data.data.status === 200) {
      saveUserInfo(data.data.data);
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      });
    }
  }
  return {
    userInfo,
    saveUserInfo,
    getAndUpdateUserInfo
  };
});
