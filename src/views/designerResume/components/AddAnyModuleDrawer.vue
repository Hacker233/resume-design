<template>
  <el-drawer
    :model-value="drawer"
    :modal="true"
    :size="600"
    class="add-any-module-drawer"
    modal-class="modal-add-any-module-drawer"
    direction="ltr"
    title="拖拽以添加任意模块"
    destroy-on-close
    @close="handleClose"
  >
    <module-select v-if="drawer" :show-module-name="false" :show-title="false"></module-select>
  </el-drawer>
</template>
<script lang="ts" setup>
  import ModuleSelect from '@/views/createTemplate/designer/components/ModuleSelect.vue';

  const emit = defineEmits(['closeStyleDrawer']);

  defineProps<{
    drawer: boolean;
  }>();

  // 关闭弹窗
  const handleClose = () => {
    pageActiveNames.value = [];
    emit('closeStyleDrawer');
  };

  // 页面配置折叠面吧
  const pageActiveNames = ref([]);
</script>
<style lang="scss">
  .modal-add-any-module-drawer {
    background-color: rgba(78, 78, 78, 0);
    width: 600px;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    .el-drawer__body {
      border-top: 1px solid #eee;
      .c-scrollbar {
        height: calc(100vh - 75px);
      }
    }
  }
  .add-any-module-drawer {
    .el-drawer__body {
      padding: 0;
      display: flex;
      flex-direction: column;
      .collapse-line-bolck {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 5px 21px 0 rgba(78, 78, 78, 0.05);
        background: linear-gradient(0deg, #f3e7e9 0%, #e3eeff 100%);
        user-select: none;
        h1 {
          font-size: 16px;
          margin: 0;
          letter-spacing: 1px;
          font-weight: bold;
          font-family: '微软雅黑';
        }
      }
      .el-collapse {
        width: 100%;
        height: 100%;
        .el-collapse-item__header {
          padding: 0 20px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 2px;
          border-bottom: 1px solid #ebeef5;
        }
        .el-collapse-item__content {
          padding: 30px 20px 10px 20px;
        }
        .el-collapse-item__wrap {
          border-bottom: none;
        }
      }
    }
  }
</style>
