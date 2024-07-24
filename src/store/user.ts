import { getUserIntegralTotalAsync } from '@/http/api/integral';
import { getUserInfoAsync } from '@/http/api/user';
import { defineStore } from 'pinia';
import appStore from './index';

// 用户信息
export const useUserInfoStore = defineStore('userInfoStore', () => {
  const userInfo = ref<any>(
    localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : ''
  );
  // 用户简币
  const userIntegralInfo = ref<any>(0);

  function saveUserInfo(userInfoObj: any) {
    userInfo.value = userInfoObj;
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value));
  }

  function saveIntegralInfo(integalInfo: any) {
    userIntegralInfo.value = integalInfo;
  }

  // 查询用户信息
  async function getAndUpdateUserInfo() {
    const email = userInfo.value ? userInfo.value.email : '';
    const data = await getUserInfoAsync(email);
    if (data.data.status === 200) {
      saveUserInfo(data.data.data);
      // 查询用户会员信息
      const { getUserMembershipInfo } = appStore.useMembershipStore;
      getUserMembershipInfo();
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      });
    }
  }

  // 查询用户当前用户简币信息
  async function getUserIntegralTotal() {
    const data = await getUserIntegralTotalAsync();
    if (data.data.status === 200) {
      saveIntegralInfo(data.data.data);
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      });
    }
  }
  return {
    userInfo,
    userIntegralInfo,
    saveUserInfo,
    saveIntegralInfo,
    getAndUpdateUserInfo,
    getUserIntegralTotal
  };
});
