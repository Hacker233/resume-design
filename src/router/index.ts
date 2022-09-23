import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginDialog from '@/components/LoginDialog/LoginDialog';
import { closeGlobalLoading } from '@/utils/common';

const Designer = () => import('@/views/designer/index.vue');
const Index = () => import('@/views/index/index.vue');
const Custom = () => import('@/views/custom/index.vue');
const EmailVerify = () => import('@/views/emailVerify/index.vue');
const ForgetPassword = () => import('@/views/forgetPassword/index.vue');
const ResetPassword = () => import('@/views/resetPassword/index.vue');
const Person = () => import('@/views/person/index.vue');
const PersonDetail = () => import('@/views/person/personDetial/index.vue');
const AccountSetting = () => import('@/views/person/accountSetting/index.vue');
const MyResume = () => import('@/views/person/myResume/index.vue');
const PdfPreview = () => import('@/views/PdfPreview/index.vue');
const Template = () => import('@/views/template/index.vue');
const MyContribute = () => import('@/views/person/myContribute/index.vue');

// 管理员界面
const AdminIndex = () => import('@/views/admin/index.vue');
const Panel = () => import('@/views/admin/panel/index.vue');
const AddTemplate = () => import('@/views/admin/templateManage/addTemplate/index.vue');
const TemplateList = () => import('@/views/admin/templateManage/templateList/index.vue');
const UserList = () => import('@/views/admin/userManage/uerList/index.vue');
const SponsorList = () => import('@/views/admin/userManage/sponsorList/index.vue');
const ResumeList = () => import('@/views/admin/resumeManage/resumeList/index.vue');
const TobeAudit = () => import('@/views/admin/templateManage/tobeAudit/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '首页',
      keepAlive: true,
      isShowComNav: false, // 是否显示公共的导航栏
      requireLogin: false
    },
    component: Index
  },
  {
    path: '/designer',
    name: 'Designer',
    meta: {
      title: '设计',
      keepAlive: true,
      isShowComNav: false,
      requireLogin: true
    },
    component: Designer
  },
  {
    path: '/custom',
    name: 'Custom',
    meta: {
      title: '自定义',
      keepAlive: true,
      isShowComNav: false,
      requireLogin: true
    },
    component: Custom
  },
  {
    path: '/pdfPreview',
    name: 'PdfPreview',
    meta: {
      title: '简历预览页',
      keepAlive: false,
      isShowComNav: false,
      requireLogin: false
    },
    component: PdfPreview
  },
  {
    path: '/emailVerify',
    name: 'EmailVerify',
    meta: {
      title: '邮箱验证',
      keepAlive: false,
      isShowComNav: true,
      requireLogin: false
    },
    component: EmailVerify
  },
  {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    meta: {
      title: '忘记密码',
      keepAlive: false,
      isShowComNav: true,
      requireLogin: false
    },
    component: ForgetPassword
  },
  {
    path: '/resetPassword',
    name: 'ResetPassword',
    meta: {
      title: '重置密码',
      keepAlive: false,
      isShowComNav: true,
      requireLogin: false
    },
    component: ResetPassword
  },
  {
    path: '/template',
    name: 'Template',
    meta: {
      title: '模板列表',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: false
    },
    component: Template
  },
  {
    path: '/person',
    name: 'Person',
    redirect: '/person/personDetail',
    meta: {
      title: '个人中心',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: true
    },
    component: Person,
    children: [
      {
        path: 'personDetail',
        name: 'PersonDetail',
        meta: {
          title: '个人信息',
          keepAlive: true,
          isShowComNav: true,
          requireLogin: true,
          showTitle: true
        },
        component: PersonDetail
      },
      {
        path: 'accountSetting',
        name: 'AccountSetting',
        meta: {
          title: '账号设置',
          keepAlive: true,
          isShowComNav: true,
          requireLogin: true,
          showTitle: true
        },
        component: AccountSetting
      },
      {
        path: 'myResume',
        name: 'MyResume',
        meta: {
          title: '我的简历',
          keepAlive: true,
          isShowComNav: true,
          requireLogin: true,
          showTitle: true
        },
        component: MyResume
      },
      {
        path: 'myContribute',
        name: 'MyContribute',
        meta: {
          title: '我的贡献',
          keepAlive: true,
          isShowComNav: true,
          requireLogin: true,
          showTitle: false
        },
        component: MyContribute
      }
    ]
  },

  // 管理员界面
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      title: '管理员页面',
      keepAlive: true,
      isShowComNav: false,
      requireLogin: true
    },
    component: AdminIndex,
    redirect: '/admin/panel',
    children: [
      {
        path: 'panel',
        name: 'Panel',
        meta: {
          title: '管理面板',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: Panel
      },
      {
        path: 'addTemplate',
        name: 'AddTemplate',
        meta: {
          title: '新增模板',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: AddTemplate
      },
      {
        path: 'templateList',
        name: 'TemplateList',
        meta: {
          title: '模板列表',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: TemplateList
      },
      {
        path: 'TobeAudit',
        name: 'TobeAudit',
        meta: {
          title: '待审核模板',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: TobeAudit
      },
      {
        path: 'userList',
        name: 'UserList',
        meta: {
          title: '用户列表',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: UserList
      },
      {
        path: 'sponsorList',
        name: 'SponsorList',
        meta: {
          title: '赞助列表',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: SponsorList
      },
      {
        path: 'resumeList',
        name: 'ResumeList',
        meta: {
          title: '简历列表',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: ResumeList
      }
    ]
  }
];
// const routerHistory = createWebHistory('/');
const router = createRouter({
  history: createWebHistory(),
  routes
});

// 全局守卫：登录拦截 本地没有存token,请重新登录
router.beforeEach((to, from, next) => {
  console.log(to, from);
  const token = localStorage.getItem('token');
  const userInfo = localStorage.getItem('userInfo');
  // 需要权限且已经登录
  if (to.meta.requireLogin && !token) {
    closeGlobalLoading(); // 关闭全局等待层
    LoginDialog(true, to.fullPath);
  } else if (to.meta.requireLogin && token) {
    // 需要权限且已经登录
    if (userInfo) {
      const emailVerify = JSON.parse(userInfo as string).auth.email.valid;
      if (emailVerify) {
        next();
      } else {
        router.push({
          path: '/emailVerify',
          query: {
            email: JSON.parse(userInfo as string).email
          }
        });
      }
    } else {
      closeGlobalLoading(); // 关闭全局等待层
      LoginDialog(true, to.fullPath);
    }
  } else {
    next();
  }
});
export default router;
