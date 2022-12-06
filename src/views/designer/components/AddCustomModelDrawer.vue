<template>
  <el-drawer
    :model-value="drawerVisible"
    :close-on-press-escape="false"
    :modal="false"
    :direction="direction"
    :close-on-click-modal="false"
    :before-close="beforeCloseAddDrawer"
  >
    <span>Hi, there!</span>
  </el-drawer>
</template>
<script lang="ts" setup>
  const emit = defineEmits(['beforeCloseAddDrawer']);
  interface TDialog {
    drawerVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    drawerVisible: false
  });
  const direction = ref('ltr');

  //   关闭抽屉
  const beforeCloseAddDrawer = () => {
    emit('beforeCloseAddDrawer');
  };
</script>
