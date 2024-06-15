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
    <menu-item
      v-for="(child, index) in item.children"
      :key="index"
      :item="child"
      :key-index="item.name + index"
    />
  </el-sub-menu>
  <el-menu-item v-else :index="item.path">{{ item.title }}</el-menu-item>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue';

  interface MenuItem {
    name: string;
    path: string;
    title: string;
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
</script>
