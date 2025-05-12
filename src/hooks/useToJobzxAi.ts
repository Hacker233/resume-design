import appStore from '@/store';

// 跳转到useToJobzxAi
export const useToJobzxAi = () => {
  // 获取用户id
  const { token } = appStore.useTokenStore;
  let id = '';
  if (token) {
    id = appStore.useUserInfoStore.userInfo._id;
  }
  window.open('https://www.jobzx.cn?ref=maobu&id=' + id, '_blank', 'noopener,noreferrer');
};
