import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/normalize.css';
import component from '@/template/register';
import '@/styles/global.less';
// 注册所有图标
import SvgIcon from '@/components/SvgIcon/index.vue';
import elementIcons from '@/components/SvgIcon/svgicon';


// 创建vue实例
const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(component);
app.use(elementIcons);
app.component('SvgIcon', SvgIcon);

// 挂载实例
app.mount('#app');
