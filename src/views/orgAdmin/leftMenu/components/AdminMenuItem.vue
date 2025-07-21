<template>
  <el-sub-menu
    v-if="item.children && item.children.length > 0"
    popper-class="navbar-popper-box"
    :index="keyIndex"
    :show-timeout="0"
    :hide-timeout="100"
  >
    <template #title>
      <svg-icon :icon-name="item.iconfont" class="iconfont" color="#303133" size="20px"></svg-icon>
      <span>{{ item.title }}</span>
    </template>
    <template v-for="(child, index) in item.children" :key="index">
      <admin-menu-item v-if="child.status === 1" :item="child" :key-index="item.name + index" />
    </template>
  </el-sub-menu>
  <el-menu-item v-else :index="item.path">
    <svg-icon
      :icon-name="item.iconfont"
      class="iconfont"
      :color="getIconColor(item.name)"
      size="18px"
    ></svg-icon>
    <span>{{ item.title }}</span>
  </el-menu-item>
</template>

<script lang="ts" setup>
  interface MenuItem {
    iconfont: string;
    name: string;
    path: string;
    title: string;
    status: number;
    children?: MenuItem[];
  }

  const props = defineProps({
    currentIndex: {
      type: String,
      default: ''
    },
    item: {
      type: Object as () => MenuItem,
      required: true
    },
    keyIndex: {
      type: String,
      required: true
    }
  });

  // 返回图标颜色
  const getIconColor = (index: string) => {
    return props.currentIndex === index ? '#2cbd99' : '#303133';
  };
</script>
