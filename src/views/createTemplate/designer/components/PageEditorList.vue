<template>
  <div class="page-editor-icon-list">
    <ul>
      <el-tooltip effect="light" content="主题配置" placement="right">
        <li @click="openThemeDrawer">
          <svg-icon icon-name="icon-tesezhuti" color="#2cbd99" size="20px"></svg-icon>
        </li>
      </el-tooltip>
      <el-tooltip effect="light" content="页面选择" placement="right">
        <li @click="selectPage">
          <svg-icon icon-name="icon-background" color="#2cbd99" size="20px"></svg-icon>
        </li>
      </el-tooltip>
      <el-tooltip effect="light" content="查看页面JSON" placement="right">
        <li @click="openPageJSON">
          <svg-icon icon-name="icon-json-full" color="#2cbd99" size="20px"></svg-icon>
        </li>
      </el-tooltip>
      <el-tooltip effect="light" content="下载页面JSON" placement="right">
        <li @click="exportJSON">
          <svg-icon icon-name="icon-xiazai" color="#2cbd99" size="20px"></svg-icon>
        </li>
      </el-tooltip>
      <el-tooltip v-if="selectedModuleId" effect="light" content="查看模块JSON" placement="right">
        <li @click="openModuleJSON">
          <svg-icon icon-name="icon-json" color="#2cbd99" size="20px"></svg-icon>
        </li>
      </el-tooltip>
    </ul>

    <!-- 模块JSON -->
    <view-json-drawer
      :drawer="moduleDrawer"
      :json="moduleJson"
      @close-json-drawer="closeModuleJsonDrawer"
    ></view-json-drawer>

    <!-- 页面JSON -->
    <view-json-drawer
      :drawer="pageDrawer"
      :json="pageJson"
      @close-json-drawer="closePageJsonDrawer"
    ></view-json-drawer>

    <!-- 选择背景页面弹窗 -->
    <select-page-dialog
      :dialog-page-visible="dialogPageVisible"
      @cancle="handleCanclePage"
    ></select-page-dialog>

    <!-- 主题设置抽屉 -->
    <theme-style-setting-drawer
      :drawer="themeSettingDrawer"
      @close-style-drawer="handleCloseDrawer"
    ></theme-style-setting-drawer>
  </div>
</template>
<script lang="ts" setup>
  import FileSaver from 'file-saver';
  import appStore from '@/store';
  import ViewJsonDrawer from './ViewJsonDrawer.vue';
  import ThemeStyleSettingDrawer from './ThemeStyleSettingDrawer.vue';
  import { useGetSelectedModule } from '../hooks/useGetSelectedModule';
  import { storeToRefs } from 'pinia';
  import SelectPageDialog from './SelectPageDialog.vue';

  const { HJNewJsonStore, selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);

  // 模块JSON弹窗
  const moduleJson = ref<any>({});
  const moduleDrawer = ref<boolean>(false);
  const openModuleJSON = () => {
    moduleJson.value = useGetSelectedModule(selectedModuleId.value);
    moduleDrawer.value = true;
  };
  const closeModuleJsonDrawer = () => {
    moduleDrawer.value = false;
  };

  // 页面JSON弹窗
  const pageJson = ref<any>({});
  const pageDrawer = ref<boolean>(false);
  const openPageJSON = () => {
    pageJson.value = HJNewJsonStore.value;
    pageDrawer.value = true;
  };
  const closePageJsonDrawer = () => {
    pageDrawer.value = false;
  };

  // 导出为JSON
  const exportJSON = () => {
    const data = JSON.stringify(HJNewJsonStore.value, null, 4);
    const blob = new Blob([data], { type: '' });
    FileSaver.saveAs(blob, HJNewJsonStore.value.config.title + '.json');
  };

  // 打开切换页面弹窗
  const dialogPageVisible = ref<boolean>(false);
  const selectPage = () => {
    dialogPageVisible.value = true;
  };

  // 关闭切换页面弹窗
  const handleCanclePage = () => {
    dialogPageVisible.value = false;
  };

  // 主题设置抽屉
  const themeSettingDrawer = ref<boolean>(false);
  const openThemeDrawer = () => {
    themeSettingDrawer.value = true;
  };

  // 关闭主题设置抽屉
  const handleCloseDrawer = () => {
    themeSettingDrawer.value = false;
  };
</script>
<style lang="scss" scoped>
  .page-editor-icon-list {
    width: 100%;
    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      li {
        width: 44px;
        height: 44px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 50%;
        background-color: #fff;
        position: relative;
        box-shadow: 0 2px 4px #0000000a;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          opacity: 0.7;
          box-shadow: 0 5px 4px #0000000a;
        }
      }
    }
  }
</style>
