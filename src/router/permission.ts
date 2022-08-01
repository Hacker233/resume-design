import router from '@/router';
import { useAuthStore } from '@/store/auth';

// 白名单
const whiteList: string[] = ['/'];

/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  // 1. 用户已登录，则可以进入任何页面
  if (authStore.isLogin) {
    next();
    // 2. 用户未登录，显示登录弹窗
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      console.log('没登录');
      authStore.setIsShowModal(true);
      next('/');
    }
  }
});
