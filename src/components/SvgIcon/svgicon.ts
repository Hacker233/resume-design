// 注册所有 @element-plus/icons-vue 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { App } from 'vue';
export default {
  install: (app: App<Element>) => {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  }
};