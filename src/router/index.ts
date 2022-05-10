import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const Designer = () => import('@/views/designer/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'LoginPage',
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: false
    },
    component: () => import('@/pages/login.vue')
  },
  {
    path: '/',
    name: 'Designer',
    meta: {
      title: '设计',
      keepAlive: true,
      requireAuth: true
    },
    component: Designer
  },
  {
    path: '/vueUse',
    name: 'VueUse',
    meta: {
      title: 'vueUse demo',
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/pages/vueUse.vue')
  },
  {
    path: '/request',
    name: 'RequestPage',
    meta: {
      title: 'request demo',
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/pages/request.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;
