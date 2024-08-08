import { getUserMembershipAsync } from '@/http/api/membership';
import { defineStore } from 'pinia';

// 用户信息
export const useMembershipStore = defineStore('membershipStore', () => {
  const membershipInfo = ref<any>(
    localStorage.getItem('membershipInfo')
      ? JSON.parse(localStorage.getItem('membershipInfo') as string)
      : ''
  );
  // 保存用户会员信息
  function saveMembershipInfo(membershipInfoObj: any) {
    membershipInfo.value = membershipInfoObj;
    localStorage.setItem('membershipInfo', JSON.stringify(membershipInfo.value));
  }

  // 查询用户信息
  async function getUserMembershipInfo() {
    const data = await getUserMembershipAsync();
    if (data.data.status === 200) {
      saveMembershipInfo(data.data.data);
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      });
    }
  }

  return {
    membershipInfo,
    getUserMembershipInfo,
    saveMembershipInfo
  };
});
