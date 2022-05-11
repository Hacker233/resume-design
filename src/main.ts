import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/normalize.css';
import component from '@/template/register';
import '@/styles/global.less';

// 创建vue实例
const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(component);

// 挂载实例
app.mount('#app');
