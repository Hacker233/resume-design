<template>
  <div class="person-menu-box">
    <el-menu :default-active="route.name" class="el-menu-vertical-demo">
      <el-menu-item index="PersonDetail" @click="toPersonDetail">
        <svg-icon
          icon-name="icon-jibenziliao"
          class="iconfont"
          :color="getIconColor('PersonDetail')"
          size="20px"
        ></svg-icon>
        <span>个人信息</span>
      </el-menu-item>
      <el-menu-item index="MyResume" @click="toMyResume">
        <svg-icon
          icon-name="icon-xiangmujingli-04"
          class="iconfont"
          :color="getIconColor('MyResume')"
          size="20px"
        ></svg-icon>
        <span>我的简历</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
  import { MenuItemClicked } from 'element-plus';

  const route = useRoute();
  const router = useRouter();
  // 返回图标颜色
  const currentIndex = ref<any>(route.name); // 选中的菜单index
  const getIconColor = (index: string) => {
    return currentIndex.value === index ? '#2cbd99' : '#303133';
  };

  // 跳转至个人详情
  const toPersonDetail = (item: MenuItemClicked) => {
    currentIndex.value = item.index;
    router.push('/person/personDetail');
  };

  // 跳转至我的简历页面
  const toMyResume = (item: MenuItemClicked) => {
    currentIndex.value = item.index;
    router.push('/person/myResume');
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
