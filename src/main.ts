import { createApp } from 'vue';
import App from './App.vue';
// import store from './store';
import router from './router';
import '@/style/normalize.css';
import component from '@/utils/registerCom';
// 注册所有图标
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
import elementIcons from '@/components/SvgIcon/svgicon';
// 颜色选择控件
import ColorPicker from 'colorpicker-v3'; // 注册组件
import 'colorpicker-v3/style.css'; // 引入样式文件
// 图标
import '@/assets/iconfont/iconfont.js';
// 字体文件
import '@/assets/font/font.css';

// 滚动条
import CScrollbar from 'c-scrollbar';

// element-plus部分组件样式
import 'element-plus/theme-chalk/src/message.scss';

// 注册store
import { createPinia } from 'pinia';
import { registerStore } from '@/store';
import VueViewer from 'v-viewer';

import 'default-passive-events';

import VueDOMPurifyHTML from 'vue-dompurify-html';

// 创建vue实例
const app = createApp(App);
// app.use(store);
app.use(createPinia());
// 注册pinia状态管理库
registerStore();

app.use(router);
app.use(component);
app.use(elementIcons);
app.use(VueDOMPurifyHTML);
app.use(ColorPicker);
app.use(CScrollbar);
app.use(VueViewer, {
  defaultOptions: {
    // 自定义默认配置
  }
});
app.component('SvgIcon', SvgIcon);

// 挂载实例
app.mount('#app');
