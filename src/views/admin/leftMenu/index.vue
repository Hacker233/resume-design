<template>
  <div class="left-menu-box">
    <el-menu
      :default-active="route.name"
      class="el-menu-vertical-demo"
      unique-opened
      @select="handleSelect"
    >
      <el-menu-item index="Panel">
        <svg-icon
          icon-name="icon-gongzuotai"
          class="iconfont"
          :color="getIconColor('Panel')"
          size="18px"
        ></svg-icon>
        <span>管理面板</span>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <svg-icon
            icon-name="icon-gongzuoleixing"
            class="iconfont"
            color="#303133"
            size="20px"
          ></svg-icon>
          <span>模板管理</span>
        </template>
        <el-menu-item index="AddTemplate">
          <svg-icon
            icon-name="icon-jia"
            class="iconfont"
            :color="getIconColor('AddTemplate')"
            size="18px"
          ></svg-icon>
          <span>添加模板</span>
        </el-menu-item>
        <el-menu-item index="TemplateList">
          <svg-icon
            icon-name="icon-hengxiangbuju"
            class="iconfont"
            :color="getIconColor('TemplateList')"
            size="16px"
          ></svg-icon>
          <span>模板列表</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <svg-icon
            icon-name="icon-guanliyuan_jiaoseguanli"
            class="iconfont"
            color="#303133"
            size="20px"
          ></svg-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="UserList">
          <svg-icon
            icon-name="icon-qunzuduoren"
            class="iconfont"
            :color="getIconColor('UserList')"
            size="18px"
          ></svg-icon>
          <span>用户列表</span>
        </el-menu-item>
        <el-menu-item index="SponsorList">
          <svg-icon
            icon-name="icon-zhengzhi"
            class="iconfont"
            :color="getIconColor('SponsorList')"
            size="18px"
          ></svg-icon>
          <span>赞助列表</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <svg-icon
            icon-name="icon-gongzuoleixing"
            class="iconfont"
            color="#303133"
            size="20px"
          ></svg-icon>
          <span>简历管理</span>
        </template>
        <el-menu-item index="ResumeList">
          <svg-icon
            icon-name="icon-xiangmujingli-04"
            class="iconfont"
            :color="getIconColor('ResumeList')"
            size="18px"
          ></svg-icon>
          <span>简历列表</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
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
