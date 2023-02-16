<template>
  <div class="left-menu-box">
    <el-menu
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
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
  // 菜单列表
  const menuList = reactive<Array<any>>([
    {
      index: 'Panel',
      iconfont: 'icon-gongzuotai',
      title: '管理面板'
    },
    {
      index: '1',
      iconfont: 'icon-gongzuoleixing',
      title: '模板管理',
      children: [
        {
          index: 'AddTemplate',
          iconfont: 'icon-jia',
          title: '添加模板'
        },
        {
          index: 'TemplateList',
          iconfont: 'icon-hengxiangbuju',
          title: '模板列表'
        },
        {
          index: 'TobeAudit',
          iconfont: 'icon-caogaoxiang1',
          title: '待审核模板'
        }
      ]
    },
    {
      index: '2',
      iconfont: 'icon-guanliyuan_jiaoseguanli',
      title: '用户管理',
      children: [
        {
          index: 'UserList',
          iconfont: 'icon-qunzuduoren',
          title: '用户列表'
        },
        {
          index: 'SponsorList',
          iconfont: 'icon-zhengzhi',
          title: '赞助列表'
        }
      ]
    },
    {
      index: '3',
      iconfont: 'icon-gongzuoleixing',
      title: '简历管理',
      children: [
        {
          index: 'ResumeList',
          iconfont: 'icon-xiangmujingli-04',
          title: '简历列表'
        }
      ]
    },
    {
      index: '4',
      iconfont: 'icon-Word',
      title: 'World模板',
      children: [
        {
          index: 'WordTemplateList',
          iconfont: 'icon-Word1',
          title: '模板列表'
        },
        {
          index: 'WordCategoryList',
          iconfont: 'icon-shujuku',
          title: '分类管理'
        }
      ]
    },
    {
      index: '5',
      iconfont: 'icon-ppt',
      title: 'PPT模板',
      children: [
        {
          index: 'PPTTemplateList',
          iconfont: 'icon-Word1',
          title: '模板列表'
        },
        {
          index: 'PPTCategoryList',
          iconfont: 'icon-ppt-ext',
          title: '分类管理'
        }
      ]
    },
    {
      index: '6',
      iconfont: 'icon-contact',
      title: '评论管理',
      children: [
        {
          index: 'CommentList',
          iconfont: 'icon-lianxiwomen',
          title: '评论列表'
        }
      ]
    },
    {
      index: '7',
      iconfont: 'icon-wenzhangliebiaoxiangqing',
      title: '文章管理',
      children: [
        {
          index: 'AddArticle',
          iconfont: 'icon-wenzhang',
          title: '新增文章'
        },
        {
          index: 'ArticleList',
          iconfont: 'icon-wenzhangliebiao',
          title: '文章列表'
        },
        {
          index: 'ArticleCategory',
          iconfont: 'icon-ai-module',
          title: '文章分类'
        }
      ]
    },
    {
      index: '8',
      iconfont: 'icon-fufeizhifu',
      title: '付费管理',
      children: [
        {
          index: 'AddArticle',
          iconfont: 'icon-codepen',
          title: '源码购买用户'
        }
      ]
    }
  ]);

  const router = useRouter();
  const route = useRoute();
  // 点击菜单
  const currentIndex = ref<any>(route.name); // 选中的菜单index
  console.log('currentIndex', currentIndex);
  const handleSelect = (index: string) => {
    console.log('index', index);
    currentIndex.value = index;
    router.push({
      name: index
    });
  };

  // 返回图标颜色
  const getIconColor = (index: string) => {
    return currentIndex.value === index ? '#2cbd99' : '#303133';
  };
</script>
<style lang="scss" scoped>
  .left-menu-box {
    height: 100%;
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
