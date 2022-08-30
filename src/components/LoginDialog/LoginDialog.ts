import { createApp } from 'vue';
import LoginDialog from '@/components/LoginDialog/LoginDialog.vue';

const createDialog = () => {
  const mountNode = document.createElement('div');
  const Instance = createApp(LoginDialog, {
    cancle: () => {
      Instance.unmount();
      document.body.removeChild(mountNode);
    },
    confirm: () => {
      Instance.unmount();
      document.body.removeChild(mountNode);
    }
  });
  console.log(Instance);
  document.body.appendChild(mountNode);
  Instance.mount(mountNode);
};

export default createDialog;
