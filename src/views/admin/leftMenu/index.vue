<template>
  <div class="left-menu-box">
    <el-menu :default-active="route.name" class="el-menu-vertical-demo" unique-opened>
      <el-sub-menu :index="route.name">
        <template #title>
          <svg-icon
            icon-name="icon-gongzuoleixing"
            class="iconfont"
            color="#303133"
            size="20px"
          ></svg-icon>
          <span>模板管理</span>
        </template>
        <el-menu-item index="AddTemplate" @click="handleClick">
          <svg-icon
            icon-name="icon-jia"
            class="iconfont"
            :color="getIconColor('AddTemplate')"
            size="18px"
          ></svg-icon>
          <span>添加模板</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
  import { MenuItemClicked } from 'element-plus/lib/components';
  const router = useRouter();
  const route = useRoute();
  // 点击菜单
  const currentIndex = ref<any>(route.name); // 选中的菜单index
  console.log("currentIndex",currentIndex)
  const handleClick = (item: MenuItemClicked) => {
    console.log('item', item);
    currentIndex.value = item.index;
    router.push({
      name: 'AddTemplate'
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
