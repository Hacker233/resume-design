import { createApp } from 'vue';
import LoginDialog from '@/components/LoginDialog/LoginDialog.vue';
import router from '@/router';

const createDialog = (isLogin = false, to = '', fn?: () => any) => {
  const mountNode = document.createElement('div');
  const Instance = createApp(LoginDialog, {
    isLogin: isLogin,
    cancle: () => {
      Instance.unmount();
      document.body.removeChild(mountNode);
    },
    confirm: () => {
      if (to) {
        router.push(to); // 登录成功后跳转目标路径
      }
      Instance.unmount();
      document.body.removeChild(mountNode);
      if (fn) {
        fn();
      }
    }
  });
  console.log(Instance);
  document.body.appendChild(mountNode);
  Instance.use(router);
  Instance.mount(mountNode);
};

export default createDialog;
