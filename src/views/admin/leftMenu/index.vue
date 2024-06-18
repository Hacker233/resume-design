<template>
  <div class="admin-left-menu-box">
    <c-scrollbar trigger="hover" style="height: 100%">
      <el-menu
        :default-active="route.path"
        class="el-menu-demo"
        :ellipsis="false"
        router
        :popper-offset="10"
        @select="handleSelect"
      >
        <template v-for="(item, index) in adminMenuList" :key="index">
          <!-- 只显示启用中的 -->
          <admin-menu-item
            v-if="item.status === 1"
            :item="item"
            :key-index="item.name + index"
            :current-index="currentIndex"
          />
        </template>
      </el-menu>
      <!-- <el-menu
        :default-active="route.name"
        class="el-menu-vertical-demo"
        unique-opened
        @select="handleSelect"
      >
        <template v-for="(item, index) in menuList">
          <template v-if="!item.children">
            <el-menu-item :key="index" :index="item.index">
              <svg-icon
                :icon-name="item.iconfont"
                class="iconfont"
                :color="getIconColor(item.index)"
                size="18px"
              ></svg-icon>
              <span>{{ item.title }}</span>
            </el-menu-item>
          </template>
          <template v-else>
            <el-sub-menu :key="index" :index="item.index">
              <template #title>
                <svg-icon
                  :icon-name="item.iconfont"
                  class="iconfont"
                  color="#303133"
                  size="20px"
                ></svg-icon>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="(childItem, childIndex) in item.children"
                :key="childIndex"
                :index="childItem.index"
              >
                <svg-icon
                  :icon-name="childItem.iconfont"
                  class="iconfont"
                  :color="getIconColor(childItem.index)"
                  size="18px"
                ></svg-icon>
                <span>{{ childItem.title }}</span>
              </el-menu-item>
            </el-sub-menu>
          </template>
        </template>
      </el-menu> -->
    </c-scrollbar>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import AdminMenuItem from './components/AdminMenuItem.vue';

  // 查询首页导航菜单
  const { getAdminMenuList } = appStore.useIndexMenuStore;
  getAdminMenuList();

  // 菜单列表
  const { adminMenuList } = storeToRefs(appStore.useIndexMenuStore);
  // const menuList = reactive<Array<any>>([
  //   {
  //     index: 'Panel',
  //     iconfont: 'icon-gongzuotai',
  //     title: '管理面板'
  //   },
  //   {
  //     index: 'website',
  //     iconfont: 'icon-wangzhanbeian',
  //     title: '网站配置',
  //     children: [
  //       {
  //         index: 'VXQun',
  //         iconfont: 'icon-weixin1',
  //         title: '微信群管理'
  //       }
  //     ]
  //   },
  //   {
  //     index: 'menu-list',
  //     iconfont: 'icon-hengxiangbuju',
  //     title: '菜单管理',
  //     children: [
  //       {
  //         index: 'IndexMenuManage',
  //         iconfont: 'icon-ruanjianguanli',
  //         title: '首页导航管理'
  //       },
  //       {
  //         index: 'AdminMenuManage',
  //         iconfont: 'icon-wenzhangliebiao',
  //         title: '管理菜单管理'
  //       }
  //     ]
  //   },
  //   {
  //     index: '1',
  //     iconfont: 'icon-gongzuoleixing',
  //     title: '模板管理',
  //     children: [
  //       {
  //         index: 'AddTemplate',
  //         iconfont: 'icon-jia',
  //         title: '添加模板'
  //       },
  //       {
  //         index: 'TemplateList',
  //         iconfont: 'icon-hengxiangbuju',
  //         title: '模板列表'
  //       },
  //       {
  //         index: 'TobeAudit',
  //         iconfont: 'icon-caogaoxiang1',
  //         title: '待审核模板'
  //       },
  //       {
  //         index: 'TemplateCategory',
  //         iconfont: 'icon-xiangmu1',
  //         title: '分类管理'
  //       }
  //     ]
  //   },
  //   {
  //     index: '2',
  //     iconfont: 'icon-guanliyuan_jiaoseguanli',
  //     title: '用户管理',
  //     children: [
  //       {
  //         index: 'UserList',
  //         iconfont: 'icon-qunzuduoren',
  //         title: '用户列表'
  //       }
  //     ]
  //   },
  //   {
  //     index: '3',
  //     iconfont: 'icon-gongzuoleixing',
  //     title: '简历管理',
  //     children: [
  //       {
  //         index: 'ResumeList',
  //         iconfont: 'icon-xiangmujingli-04',
  //         title: '简历列表'
  //       }
  //     ]
  //   },
  //   {
  //     index: '4',
  //     iconfont: 'icon-Word',
  //     title: 'World模板',
  //     children: [
  //       {
  //         index: 'WordTemplateList',
  //         iconfont: 'icon-Word1',
  //         title: '模板列表'
  //       },
  //       {
  //         index: 'WordCategoryList',
  //         iconfont: 'icon-shujuku',
  //         title: '分类管理'
  //       }
  //     ]
  //   },
  //   {
  //     index: '5',
  //     iconfont: 'icon-ppt',
  //     title: 'PPT模板',
  //     children: [
  //       {
  //         index: 'PPTTemplateList',
  //         iconfont: 'icon-Word1',
  //         title: '模板列表'
  //       },
  //       {
  //         index: 'PPTCategoryList',
  //         iconfont: 'icon-ppt-ext',
  //         title: '分类管理'
  //       }
  //     ]
  //   },
  //   {
  //     index: '6',
  //     iconfont: 'icon-contact',
  //     title: '评论管理',
  //     children: [
  //       {
  //         index: 'CommentList',
  //         iconfont: 'icon-lianxiwomen',
  //         title: '评论列表'
  //       }
  //     ]
  //   },
  //   {
  //     index: '7',
  //     iconfont: 'icon-wenzhangliebiaoxiangqing',
  //     title: '文章管理',
  //     children: [
  //       {
  //         index: 'AddArticle',
  //         iconfont: 'icon-wenzhang',
  //         title: '新增文章'
  //       },
  //       {
  //         index: 'ArticleList',
  //         iconfont: 'icon-wenzhangliebiao',
  //         title: '文章列表'
  //       },
  //       {
  //         index: 'ArticleCategory',
  //         iconfont: 'icon-ai-module',
  //         title: '文章分类'
  //       }
  //     ]
  //   },
  //   {
  //     index: '8',
  //     iconfont: 'icon-fufeizhifu',
  //     title: '付费列表',
  //     children: [
  //       {
  //         index: 'PayList',
  //         iconfont: 'icon-codepen',
  //         title: '源码购买用户'
  //       },
  //       {
  //         index: 'SponsorList',
  //         iconfont: 'icon-zhengzhi',
  //         title: '赞助列表'
  //       }
  //     ]
  //   },
  //   {
  //     index: '9',
  //     iconfont: 'icon-jifen',
  //     title: '简币管理',
  //     children: [
  //       {
  //         index: 'IntegralList',
  //         iconfont: 'icon-jifen1',
  //         title: '日志列表'
  //       },
  //       {
  //         index: 'IntegralPayConfig',
  //         iconfont: 'icon-shezhi',
  //         title: '简币消费配置'
  //       },
  //       {
  //         index: 'AliPayTradeList',
  //         iconfont: 'icon-codepen',
  //         title: '当面付订单'
  //       }
  //     ]
  //   },
  //   {
  //     index: '10',
  //     iconfont: 'icon-wenzhangliebiaoxiangqing',
  //     title: '积木管理',
  //     children: [
  //       {
  //         index: 'LegoUserTemplateList',
  //         iconfont: 'icon-fuwuqi',
  //         title: '用户创作列表'
  //       },
  //       {
  //         index: 'LegoTemplateListManage',
  //         iconfont: 'icon-wenzhangliebiao',
  //         title: '模板列表'
  //       },
  //       {
  //         index: 'LegoCategory',
  //         iconfont: 'icon-ai-module',
  //         title: '积木分类'
  //       }
  //     ]
  //   },
  //   {
  //     index: '11',
  //     iconfont: 'icon-a-ziyuan599',
  //     title: '资源分享',
  //     children: [
  //       {
  //         index: 'SoftCategoryManage',
  //         iconfont: 'icon-023tuceng',
  //         title: '软件分类管理'
  //       },
  //       {
  //         index: 'SoftShareManage',
  //         iconfont: 'icon-jichuruanjian',
  //         title: '软件分享管理'
  //       },
  //       {
  //         index: 'WebsiteTypeManage',
  //         iconfont: 'icon-_houduankaifa',
  //         title: '网站类型管理'
  //       },
  //       {
  //         index: 'WebsiteCategoryManage',
  //         iconfont: 'icon-jichuruanjian',
  //         title: '网站分类管理'
  //       },
  //       {
  //         index: 'WebsiteManage',
  //         iconfont: 'icon-jichuruanjian',
  //         title: '网站分享管理'
  //       },
  //       {
  //         index: 'PanShareManage',
  //         iconfont: 'icon-gongchengwangpan',
  //         title: '网盘资源管理'
  //       },
  //       {
  //         index: 'PanShareCategoryManage',
  //         iconfont: 'icon-daimashili',
  //         title: '网盘资源分类管理'
  //       }
  //     ]
  //   }
  // ]);

  const route = useRoute();
  // 点击菜单
  const currentIndex = ref<any>(route.name); // 选中的菜单index
  const handleSelect = (index: string) => {
    currentIndex.value = index;
  };
</script>
<style lang="scss">
  .admin-left-menu-box {
    height: calc(100vh - 50px);
    background-color: #fff;
    width: 210px;
    .iconfont {
      margin-right: 10px;
    }
    .el-menu {
      height: 100%;
      border: none;
      user-select: none;
    }
  }
</style>
