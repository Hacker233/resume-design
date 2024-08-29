import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginDialog from '@/components/LoginDialog/LoginDialog';
import { closeGlobalLoading } from '@/utils/common';
import CONFIG from '@/config';

const Designer = () => import('@/views/designer/index.vue');
const Index = () => import('@/views/index/index.vue');
const Custom = () => import('@/views/custom/index.vue');
const EmailVerify = () => import('@/views/emailVerify/index.vue');
const ForgetPassword = () => import('@/views/forgetPassword/index.vue');
const ResetPassword = () => import('@/views/resetPassword/index.vue');
const Person = () => import('@/views/person/index.vue');
const PersonDetail = () => import('@/views/person/personDetial/index.vue');
const AccountSetting = () => import('@/views/person/accountSetting/index.vue');
const MyComment = () => import('@/views/person/myComment/index.vue');
const MyResume = () => import('@/views/person/myResume/index.vue');
const PdfPreview = () => import('@/views/PdfPreview/index.vue');
const Template = () => import('@/views/template/index.vue');
const Word = () => import('@/views/word/index.vue');
const WordPreview = () => import('@/views/wordPreview/index.vue');
const PPT = () => import('@/views/ppt/index.vue');
const PPTPreview = () => import('@/views/pptPreview/index.vue');
const MyContribute = () => import('@/views/person/myContribute/index.vue');
const PersonIntegral = () => import('@/views/person/integralDetail/index.vue');
const OnlinePreview = () => import('@/views/onlinePreview/index.vue');
const MyOnlineResume = () => import('@/views/person/onlineResume/index.vue');
const LegoCreate = () => import('@/views/person/legoCreate/index.vue');
const WebCode = () => import('@/views/webCode/index.vue');
const LegoDesigner = () => import('@/views/LegoDesigner/index.vue');
const PostWorkSuccess = () => import('@/views/LegoDesigner/postWordSuccess/index.vue');
const LegoTemplateList = () => import('@/views/legoTemplateList/index.vue');
const LegoPrintPdfPreview = () =>
  import('@/views/LegoDesigner/render/LegoPrintPdfPreview/index.vue');
// 软件分享
const SoftShare = () => import('@/views/softShare/index.vue');
const SoftDetail = () => import('@/views/softDetail/index.vue');
// 网站分享
const WebsiteShare = () => import('@/views/websiteShare/index.vue');
const WebsiteDetail = () => import('@/views/websiteDetail/index.vue');
// 网盘资源分享
const PanShare = () => import('@/views/panShre/index.vue');
const PanShareDetail = () => import('@/views/panShreDetail/index.vue');
// QQ登录临时审核页面
const QQLogin = () => import('@/views/QQLoginTemp/qqLogin.vue');

// 图片压缩
const ImgCompress = () => import('@/views/imgCompress/index.vue');
// 会员充值界面
const Membership = () => import('@/views/membership/index.vue');
// 新版在线制作页面
const OnlineDesignNew = () => import('@/views/OnlineDesignNew/index.vue');

// 管理员界面
const AdminIndex = () => import('@/views/admin/index.vue');
const Panel = () => import('@/views/admin/panel/index.vue');
const VXQun = () => import('@/views/admin/WebsiteManage/VXQunManage/index.vue');
const AddTemplate = () => import('@/views/admin/templateManage/addTemplate/index.vue');
const TemplateList = () => import('@/views/admin/templateManage/templateList/index.vue');
const TemplateCategory = () => import('@/views/admin/templateManage/templateCategory/index.vue');
const UserList = () => import('@/views/admin/userManage/uerList/index.vue');
const SponsorList = () => import('@/views/admin/userManage/sponsorList/index.vue');
const ResumeList = () => import('@/views/admin/resumeManage/resumeList/index.vue');
const TobeAudit = () => import('@/views/admin/templateManage/tobeAudit/index.vue');
const WordTemplateList = () => import('@/views/admin/wordTemplate/templateList/index.vue');
const WordCategoryList = () => import('@/views/admin/wordTemplate/categoryList/index.vue');
const PPTCategoryList = () => import('@/views/admin/pptTemplate/categoryList/index.vue');
const PPTTemplateList = () => import('@/views/admin/pptTemplate/templateList/index.vue');
const CommentList = () => import('@/views/admin/commentManage/commentList/index.vue');
const AddArticle = () => import('@/views/admin/ArticleManage/AddArticle/index.vue');
const ArticleList = () => import('@/views/admin/ArticleManage/ArticleList/index.vue');
const ArticleCategory = () => import('@/views/admin/ArticleManage/ArticleCategory/index.vue');
const PublishSuccess = () =>
  import('@/views/admin/ArticleManage/AddArticle/pages/publishSuccess.vue');
const PayList = () => import('@/views/admin/payStats/payList/index.vue');
const DeployDoc = () => import('@/views/deployDoc/index.vue');
const ArticleDetail = () => import('@/views/deployDoc/pages/articleDetails.vue');
const IntegralList = () => import('@/views/admin/integralManage/IntegralList/index.vue');
const IntegralPayConfig = () => import('@/views/admin/integralManage/IntegralPayConfig/index.vue');
const AliPayTradeList = () => import('@/views/admin/integralManage/AliPayTradeList/index.vue');
const LegoCategory = () => import('@/views/admin/legoManage/legoCategory/index.vue');
const LegoTemplateListManage = () => import('@/views/admin/legoManage/legoTemplateList/index.vue');
const LegoUserTemplateList = () =>
  import('@/views/admin/legoManage/legoUserTemplateList/index.vue');
const SoftShareManage = () => import('@/views/admin/SourceShare/softShare/index.vue');
const SoftCategoryManage = () => import('@/views/admin/SourceShare/softCategory/index.vue');
const WebsiteTypeManage = () => import('@/views/admin/SourceShare/websiteType/index.vue');
const WebsiteCategoryManage = () => import('@/views/admin/SourceShare/websiteCategory/index.vue');
const WebsiteManage = () => import('@/views/admin/SourceShare/websiteShare/index.vue');
const PanShareCategoryManage = () => import('@/views/admin/SourceShare/panCategory/index.vue');
const PanShareManage = () => import('@/views/admin/SourceShare/panShare/index.vue');
const IndexMenuManage = () => import('@/views/admin/MenuManage/IndexMenuManage/index.vue');
const AdminMenuManage = () => import('@/views/admin/MenuManage/AdminMenuManage/index.vue');
const WebConfig = () => import('@/views/admin/WebsiteManage/WebConfig/index.vue');
const MembershipList = () => import('@/views/admin/userManage/membershipList/index.vue');
const MembershipConfigManage = () =>
  import('@/views/admin/MembershipManage/MembershipConfigManage/index.vue');

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
    path: '/legoDesigner',
    name: 'LegoDesigner',
    meta: {
      title: '积木搭建',
      keepAlive: true,
      isShowComNav: false,
      requireLogin: true
    },
    component: LegoDesigner
  },
  {
    path: '/onlineDesign',
    name: 'OnlineDesign',
    meta: {
      title: '新版在线制作设计页',
      keepAlive: true,
      isShowComNav: false,
      requireLogin: true
    },
    component: OnlineDesignNew
  },
  {
    path: '/legoPrintPdfPreview',
    name: 'LegoPrintPdfPreview',
    meta: {
      title: '积木制作打印预览页',
      keepAlive: false,
      isShowComNav: false,
      requireLogin: false
    },
    component: LegoPrintPdfPreview
  },
  {
    path: '/legoTemplateList',
    name: 'LegoTemplateList',
    meta: {
      title: '积木模板',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: false
    },
    component: LegoTemplateList
  },
  {
    path: '/postWorkSuccess',
    name: 'PostWorkSuccess',
    meta: {
      title: '作品发布成功',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: true
    },
    component: PostWorkSuccess
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
    path: '/word',
    name: 'Word',
    meta: {
      title: '简历模板',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: false
    },
    component: Word
  },
  {
    path: '/ppt',
    name: 'PPT',
    meta: {
      title: 'PPT模板',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: false
    },
    component: PPT
  },
  {
    path: '/soft',
    name: 'Soft',
    meta: {
      title: '软件分享',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: false
    },
    component: SoftShare
  },
  {
    path: '/website',
    name: 'Website',
    meta: {
      title: '网站分享',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: false
    },
    component: WebsiteShare
  },
  {
    path: '/panshare',
    name: 'PanShare',
    meta: {
      title: '网盘资源',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: false
    },
    component: PanShare
  },
  {
    path: '/panShareDetail',
    name: 'PanShareDetail',
    meta: {
      title: '网盘资源详情',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: false
    },
    component: PanShareDetail
  },
  {
    path: '/softDetail',
    name: 'SoftDetail',
    meta: {
      title: '软件详情',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: false
    },
    component: SoftDetail
  },
  {
    path: '/websiteDetail',
    name: 'WebsiteDetail',
    meta: {
      title: '网站详情',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: false
    },
    component: WebsiteDetail
  },
  {
    path: '/QQLogin',
    name: 'QQLogin',
    meta: {
      title: '网站详情',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: false
    },
    component: QQLogin
  },
  {
    path: '/imgCompress',
    name: 'ImgCompress',
    meta: {
      title: '图片压缩',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: false
    },
    component: ImgCompress
  },
  {
    path: '/membership',
    name: 'Membership',
    meta: {
      title: '会员充值',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: true
    },
    component: Membership
  },
  {
    path: '/webCode',
    name: 'WebCode',
    meta: {
      title: '源码获取',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: false
    },
    component: WebCode
  },
  {
    path: '/deployDoc',
    name: 'DeployDoc',
    meta: {
      title: '部署指南',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: true
    },
    component: DeployDoc
  },
  {
    path: '/wordPreview',
    name: 'WordPreview',
    meta: {
      title: 'word模板详情',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: false
    },
    component: WordPreview
  },
  {
    path: '/pptPreview',
    name: 'PPTPreview',
    meta: {
      title: 'ppt模板详情',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: false
    },
    component: PPTPreview
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
        path: 'personIntegral',
        name: 'PersonIntegral',
        meta: {
          title: '我的资产',
          keepAlive: true,
          isShowComNav: true,
          requireLogin: true,
          showTitle: false
        },
        component: PersonIntegral
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
        path: 'myComment',
        name: 'MyComment',
        meta: {
          title: '我的评论',
          keepAlive: true,
          isShowComNav: true,
          requireLogin: true,
          showTitle: true
        },
        component: MyComment
      },
      {
        path: 'legoCreate',
        name: 'LegoCreate',
        meta: {
          title: '积木创作',
          keepAlive: true,
          isShowComNav: true,
          requireLogin: true,
          showTitle: false
        },
        component: LegoCreate
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
        path: 'myOnlineResume',
        name: 'MyOnlineResume',
        meta: {
          title: '在线简历',
          keepAlive: true,
          isShowComNav: true,
          requireLogin: true,
          showTitle: true
        },
        component: MyOnlineResume
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
  {
    path: '/online/:id',
    name: 'OnlinePreview',
    meta: {
      title: '在线简历',
      keepAlive: false,
      isShowComNav: false,
      requireLogin: false
    },
    component: OnlinePreview
  },
  {
    path: '/articleDetail',
    name: 'ArticleDetail',
    meta: {
      title: '文章详情',
      keepAlive: true,
      isShowComNav: true,
      requireLogin: true
    },
    component: ArticleDetail
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
        path: 'VXQun',
        name: 'VXQun',
        meta: {
          title: '微信群管理',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: VXQun
      },
      {
        path: 'webConfig',
        name: 'WebConfig',
        meta: {
          title: '网站配置项',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: WebConfig
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
        path: 'templateCategory',
        name: 'TemplateCategory',
        meta: {
          title: '模板分类',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: TemplateCategory
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
        path: 'membershipList',
        name: 'MembershipList',
        meta: {
          title: '会员列表',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: MembershipList
      },
      {
        path: 'membershipConfigManage',
        name: 'MembershipConfigManage',
        meta: {
          title: '会员配置管理',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: MembershipConfigManage
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
      },
      {
        path: 'wordTemplateList',
        name: 'WordTemplateList',
        meta: {
          title: 'word模板',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: WordTemplateList
      },
      {
        path: 'wordCategoryList',
        name: 'WordCategoryList',
        meta: {
          title: 'word分类',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: WordCategoryList
      },
      {
        path: 'pptCategoryList',
        name: 'PPTCategoryList',
        meta: {
          title: 'ppt分类',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: PPTCategoryList
      },
      {
        path: 'pptTemplateList',
        name: 'PPTTemplateList',
        meta: {
          title: 'ppt模板',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: PPTTemplateList
      },
      {
        path: 'commentList',
        name: 'CommentList',
        meta: {
          title: '评论列表',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: CommentList
      },
      {
        path: 'addArticle',
        name: 'AddArticle',
        meta: {
          title: '新增文章',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: AddArticle
      },
      {
        path: 'articleList',
        name: 'ArticleList',
        meta: {
          title: '文章列表',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: ArticleList
      },
      {
        path: 'articleCategory',
        name: 'ArticleCategory',
        meta: {
          title: '文章分类',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: ArticleCategory
      },
      {
        path: 'publishSuccess',
        name: 'PublishSuccess',
        meta: {
          title: '文章发布成功',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: PublishSuccess
      },
      {
        path: 'payList',
        name: 'PayList',
        meta: {
          title: '付费列表',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: PayList
      },
      {
        path: 'integralList',
        name: 'IntegralList',
        meta: {
          title: '日志列表',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: IntegralList
      },
      {
        path: 'integralPayConfig',
        name: 'IntegralPayConfig',
        meta: {
          title: '简币消费配置',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: IntegralPayConfig
      },
      {
        path: 'aliPayTradeList',
        name: 'AliPayTradeList',
        meta: {
          title: '当面付订单',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: AliPayTradeList
      },
      {
        path: 'legoCategory',
        name: 'LegoCategory',
        meta: {
          title: '积木分类',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: LegoCategory
      },
      {
        path: 'legoTemplateListManage',
        name: 'LegoTemplateListManage',
        meta: {
          title: '积木列表',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: LegoTemplateListManage
      },
      {
        path: 'legoUserTemplateList',
        name: 'LegoUserTemplateList',
        meta: {
          title: '用户创作列表',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: LegoUserTemplateList
      },
      {
        path: 'softShareManage',
        name: 'SoftShareManage',
        meta: {
          title: '软件分享管理',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: SoftShareManage
      },
      {
        path: 'softCategoryManage',
        name: 'SoftCategoryManage',
        meta: {
          title: '软件分类管理',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: SoftCategoryManage
      },
      {
        path: 'websiteTypeManage',
        name: 'WebsiteTypeManage',
        meta: {
          title: '网站大类管理',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: WebsiteTypeManage
      },
      {
        path: 'websiteCategoryManage',
        name: 'WebsiteCategoryManage',
        meta: {
          title: '网站分类管理',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: WebsiteCategoryManage
      },
      {
        path: 'websiteManage',
        name: 'WebsiteManage',
        meta: {
          title: '网站分享管理',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: WebsiteManage
      },
      {
        path: 'panShareCategoryManage',
        name: 'PanShareCategoryManage',
        meta: {
          title: '网盘资源分类管理',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: PanShareCategoryManage
      },
      {
        path: 'panShareManage',
        name: 'PanShareManage',
        meta: {
          title: '网盘资源管理',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: PanShareManage
      },
      {
        path: 'indexMenuManage',
        name: 'IndexMenuManage',
        meta: {
          title: '首页导航菜单管理',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: IndexMenuManage
      },
      {
        path: 'adminMenuManage',
        name: 'AdminMenuManage',
        meta: {
          title: '首页导航菜单管理',
          keepAlive: true,
          isShowComNav: false,
          requireLogin: true
        },
        component: AdminMenuManage
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
      if (emailVerify || !CONFIG.isEmailVerify) {
        next();
      } else {
        router.push({
          path: '/emailVerify',
          query: {
            email: JSON.parse(userInfo as string).email
          }
        });
        closeGlobalLoading(); // 关闭全局等待层
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
