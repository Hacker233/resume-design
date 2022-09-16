import { createApp } from 'vue';
import LoginDialog from '@/components/LoginDialog/LoginDialog.vue';
import router from '@/router';

const createDialog = (isLogin: boolean = false, to?: string) => {
  const mountNode = document.createElement('div');
  const Instance = createApp(LoginDialog, {
    isLogin: isLogin,
    cancle: () => {
      Instance.unmount();
      document.body.removeChild(mountNode);
    },
    confirm: () => {
      if(to) {
        router.push(to)
      }
      Instance.unmount();
      document.body.removeChild(mountNode);
    }
  });
  console.log(Instance);
  document.body.appendChild(mountNode);
  Instance.use(router);
  Instance.mount(mountNode);
};

export default createDialog;
