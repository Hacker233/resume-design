<template>
  <div class="person-menu-box">
    <el-menu :default-active="route.name" class="el-menu-vertical-demo">
      <el-menu-item
        v-for="(item, index) in menuList"
        :key="index"
        :index="item.index"
        @click="toDetail(item.path, item.index)"
      >
        <svg-icon
          :icon-name="item.iconfont"
          class="iconfont"
          :color="getIconColor(item.index)"
          size="22px"
        ></svg-icon>
        <span>{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
  // 菜单列表
  const menuList = reactive<Array<any>>([
    {
      index: 'PersonDetail',
      iconfont: 'icon-jibenziliao',
      title: '个人信息',
      path: '/person/personDetail'
    },
    {
      index: 'PersonIntegral',
      iconfont: 'icon-jifen',
      title: '我的资产',
      path: '/person/personIntegral'
    },
    {
      index: 'AccountSetting',
      iconfont: 'icon-shezhi',
      title: '账号设置',
      path: '/person/accountSetting'
    },
    {
      index: 'MyResume',
      iconfont: 'icon-xiangmujingli-04',
      title: '我的简历',
      path: '/person/myResume'
    },
    {
      index: 'LegoCreate',
      iconfont: 'icon-jimu',
      title: '积木创作',
      path: '/person/legoCreate'
    },
    {
      index: 'MyOnlineResume',
      iconfont: 'icon-zaixianyonghu',
      title: '在线简历',
      path: '/person/myOnlineResume'
    }
    // {
    //   index: 'MyComment',
    //   iconfont: 'icon-pinglun1',
    //   title: '我的评论',
    //   path: '/person/myComment'
    // },
    // {
    //   index: 'MyContribute',
    //   iconfont: 'icon-caogaoxiang1',
    //   title: '我的贡献',
    //   path: '/person/myContribute'
    // }
  ]);

  const route = useRoute();
  const router = useRouter();
  // 返回图标颜色
  const currentIndex = ref<any>(route.name); // 选中的菜单index
  const getIconColor = (index: number) => {
    // console.log(currentIndex.value === index ? '#2cbd99' : '#303133');
    return currentIndex.value === index ? '#2cbd99' : '#303133';
  };

  // 跳转详情
  const toDetail = (path: string, index: string) => {
    currentIndex.value = index;
    router.push(path);
  };
</script>
<style lang="scss" scoped>
  .person-menu-box {
    padding: 30px 0 10px 0;
    .iconfont {
      margin-right: 15px;
    }
  }
</style>
