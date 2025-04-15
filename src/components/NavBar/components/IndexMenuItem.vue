<template>
  <el-sub-menu
    v-if="item.children && item.children.length > 0"
    popper-class="navbar-popper-box"
    :index="keyIndex"
    :show-timeout="0"
    :hide-timeout="100"
  >
    <template #title>
      <span>{{ item.title }}</span>
    </template>
    <template v-for="(child, index) in item.children" :key="index">
      <index-menu-item v-if="child.status === 1" :item="child" :key-index="item.name + index" />
    </template>
  </el-sub-menu>
  <template v-else>
    <el-menu-item v-if="item.isRouter === 1" :index="item.path">{{ item.title }}</el-menu-item>
    <el-menu-item v-else @click="toOtherweb(item)">{{ item.title }}</el-menu-item>
  </template>
</template>

<script lang="ts" setup>
  interface MenuItem {
    name: string;
    path: string;
    title: string;
    status: number;
    isRouter: number;
    children?: MenuItem[];
  }

  defineProps({
    item: {
      type: Object as () => MenuItem,
      required: true
    },
    keyIndex: {
      type: String,
      required: true
    }
  });

  // 非路由跳转
  const toOtherweb = (item: { path: any }) => {
    location.assign(`https://maobucv.com${item.path}`);
  };
</script>
