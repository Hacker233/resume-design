<template>
  <el-drawer
    class="add-custom-drawer"
    :model-value="drawerVisible"
    :modal="true"
    :lock-scroll="false"
    :close-on-click-modal="true"
    :direction="direction"
    :destroy-on-close="true"
    :size="500"
    @close="closeAddDrawer"
  >
    <template #header>
      <h1 class="title">点击添加任意模块</h1>
    </template>
    <!-- 内容区域 -->
    <div class="drawer-content">
      <custom-list></custom-list>
    </div>
  </el-drawer>
</template>
<script lang="ts" setup>
  import CustomList from './CustomList.vue';
  const emit = defineEmits(['closeAddDrawer']);
  interface IDrawer {
    drawerVisible: boolean;
  }
  withDefaults(defineProps<IDrawer>(), {
    drawerVisible: false
  });
  const direction = ref('ltr');

  // 关闭抽屉
  const closeAddDrawer = () => {
    console.log('关闭回调');

    emit('closeAddDrawer');
  };
</script>
<style lang="scss" scoped>
  .add-custom-drawer {
    .title {
      font-size: 18px;
    }
    .drawer-content {
      width: 100%;
      height: 100%;
      border-top: 1px solid #eee;
    }
  }
</style>
<style lang="scss">
  .add-custom-drawer {
    display: flex;
    flex-direction: column;
    .el-drawer__body {
      padding: 0;
      flex: 1;
    }
  }
</style>
