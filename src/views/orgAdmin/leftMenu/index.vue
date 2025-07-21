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
        <template v-for="(item, index) in orgAdminMenuList" :key="index">
          <!-- 只显示启用中的 -->
          <admin-menu-item
            v-if="item.status === 1"
            :item="item"
            :key-index="item.name + index"
            :current-index="currentIndex"
          />
        </template>
      </el-menu>
    </c-scrollbar>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import AdminMenuItem from './components/AdminMenuItem.vue';

  // 查询首页导航菜单
  const { getOrgAdminMenuList } = appStore.useIndexMenuStore;
  getOrgAdminMenuList();

  // 菜单列表
  const { orgAdminMenuList } = storeToRefs(appStore.useIndexMenuStore);

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
