import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';

const Designer = () => import('@/views/designer/index.vue');
const Index = () => import('@/views/index/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: false
    },
    component: Index
  },
  {
    path: '/designer',
    name: 'Designer',
    meta: {
      title: '设计',
      keepAlive: true,
      requireAuth: true
    },
    component: Designer
  },
];
// const routerHistory = createWebHistory('/');
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;
