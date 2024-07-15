// directives/config.ts
import { App, DirectiveBinding } from 'vue';
import appStore from '@/store';

const configDirectives = {
  install(app: App) {
    app.directive('config', {
      mounted(el, binding: DirectiveBinding) {
        nextTick(() => {
          const configStore: any = appStore.useWebsiteConfigStore.websiteConfig;
          const configKey = binding.arg;
          if (!configKey || !configStore[configKey]) {
            el.style.display = 'none';
          }
        });
      },
      updated(el, binding: DirectiveBinding) {
        nextTick(() => {
          const configStore: any = appStore.useWebsiteConfigStore.websiteConfig;
          const configKey = binding.arg;
          if (!configKey || !configStore[configKey]) {
            el.style.display = 'none';
          } else {
            el.style.display = '';
          }
        });
      }
    });
  }
};

export default configDirectives;
