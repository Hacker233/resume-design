import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/normalize.css';
import component from '@/utils/registerCom';
import '@/styles/global.less';
// 注册所有图标
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
import elementIcons from '@/components/SvgIcon/svgicon';
// 颜色选择控件
import ColorPicker from 'colorpicker-v3'; // 注册组件
import 'colorpicker-v3/style.css'; // 引入样式文件
// 日期处理
import moment from 'moment';
// 图标
import '@/assets/iconfont/iconfont.js';
// 图片预览
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

// 创建vue实例
const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus, { size: 'small' });
app.use(component);
app.use(elementIcons);
app.use(ColorPicker);
app.use(VueViewer);
app.component('SvgIcon', SvgIcon);
app.config.globalProperties.$moment = moment;

// 挂载实例
app.mount('#app');
