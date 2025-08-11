import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/style/normalize.css';
import component from '@/utils/registerCom';
import 'element-plus/es/components/message-box/style/index';
// 注册所有图标
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
import elementIcons from '@/components/SvgIcon/svgicon';
// 颜色选择控件
import ColorPicker from 'colorpicker-v3';
import 'colorpicker-v3/style.css';
// 字体文件
import '@/assets/font/font.css';
import '@/views/LegoDesigner/assets/font/legoFont.css';

// 滚动条
import CScrollbar from 'c-scrollbar';

// element-plus部分组件样式
import 'element-plus/theme-chalk/src/message.scss';

// 注册store
import { createPinia } from 'pinia';
import { registerStore } from '@/store';

import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';

import 'default-passive-events';

import VueDOMPurifyHTML from 'vue-dompurify-html';

import UndrawUi from './components/packages/index';

import { userAgent } from '@/utils/userAgent';

import '@/style/article/github-markdown-light.css';

import contextmenu from 'v-contextmenu';
import 'v-contextmenu/dist/themes/default.css';

import configDirectives from '@/directives/config';

// SEO
import { createHead } from '@vueuse/head';

userAgent();

// 动态加载图标库
const loadIconfont = () => {
  // 只在非预渲染环境加载图标
  if (!('__PRERENDER_INJECTED' in window) || !window.__PRERENDER_INJECTED) {
    const script = document.createElement('script');
    script.src = '/static/iconfont/iconfont.js';
    script.onload = () => console.log('Iconfont loaded successfully');
    script.onerror = () => console.error('Iconfont failed to load');
    document.body.appendChild(script);
  }
};

// 创建vue实例
const app = createApp(App);
app.use(createPinia());
registerStore();

app.use(router);
app.use(component);
app.use(elementIcons);
app.use(VueDOMPurifyHTML, {
  default: {
    ADD_TAGS: ['iframe']
  }
});
app.use(ColorPicker);
app.use(CScrollbar);
app.use(configDirectives);
app.use(VueViewer, {
  defaultOptions: {
    // 自定义默认配置
  }
});
app.use(contextmenu);
app.component('SvgIcon', SvgIcon);
app.use(UndrawUi);

const head = createHead();
app.use(head);

// 在mounted生命周期加载图标
app.config.globalProperties.$loadIcons = loadIconfont;

// 挂载实例，如果访问的是静态html，则不挂载

const isTemplatePage =
  location.pathname.startsWith('/template/template-') && location.pathname.endsWith('.html');

if (!isTemplatePage) {
  app.mount('#app');
  document.getElementById('app').classList.add('vue-mounted'); // 挂载完成后添加类名
} else {
  console.log('Template static page detected, skipping Vue mount');
}

// 确保DOM加载完成后执行
if (!('__PRERENDER_INJECTED' in window) || !window.__PRERENDER_INJECTED) {
  loadIconfont();
}
