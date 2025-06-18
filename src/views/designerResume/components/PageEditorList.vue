<template>
  <div class="page-editor-icon-list">
    <ul>
      <el-tooltip effect="light" content="主题配置" placement="right">
        <li @click="openThemeDrawer">
          <svg-icon icon-name="icon-tesezhuti" color="#2cbd99" size="20px"></svg-icon>
        </li>
      </el-tooltip>
      <el-tooltip effect="light" content="查看页面JSON" placement="right">
        <li @click="openPageJSON">
          <svg-icon icon-name="icon-json-full" color="#2cbd99" size="20px"></svg-icon>
        </li>
      </el-tooltip>
      <el-tooltip effect="light" content="添加任意模块" placement="right">
        <li @click="openAddModuleDrawer">
          <svg-icon icon-name="icon-database" color="#2cbd99" size="20px"></svg-icon>
        </li>
      </el-tooltip>
      <el-tooltip v-if="selectedModuleId" effect="light" content="查看模块JSON" placement="right">
        <li @click="openModuleJSON">
          <svg-icon icon-name="icon-json" color="#2cbd99" size="20px"></svg-icon>
        </li>
      </el-tooltip>
      <el-tooltip
        v-if="selectedModuleId && isModuleTitle"
        effect="light"
        content="切换模块标题组件"
        placement="right"
      >
        <li @click="selectModuleTitle">
          <svg-icon icon-name="icon-fuwuqi" color="#2cbd99" size="20px"></svg-icon>
        </li>
      </el-tooltip>
      <el-tooltip effect="light" content="导入已有简历数据" placement="right">
        <li @click="openImportOtherData">
          <svg-icon icon-name="icon-daoru1" color="#2cbd99" size="23px"></svg-icon>
        </li>
      </el-tooltip>
      <el-tooltip
        effect="light"
        content="如有内容位于分割线处，请通过调整模块边距或上下文中内容处回车来解决"
        placement="right"
      >
        <li>
          <svg-icon icon-name="icon-wenti" color="#2cbd99" size="20px"></svg-icon>
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
      @close-json-drawer="closePageJsonDrawer"
    ></view-json-drawer>

    <!-- 主题设置抽屉 -->
    <theme-style-setting-drawer
      :drawer="themeSettingDrawer"
      @close-style-drawer="handleCloseDrawer"
    ></theme-style-setting-drawer>

    <!-- 添加任意模块抽屉 -->
    <add-any-module-drawer
      :drawer="addModuleDrawer"
      @close-style-drawer="handleCloseAddModuleDrawer"
    ></add-any-module-drawer>

    <!-- 切换模块标题弹窗 -->
    <select-module-title-dialog
      :dialog-module-title-visible="dialogModuleTitleVisible"
      :show-module-title-name="false"
      @cancle="handleCancleModuleTitle"
    ></select-module-title-dialog>

    <!-- 导入已有简历数据弹窗 -->
    <import-other-resume-data-dialog
      :dialog-import-other-data-visible="dialogImportOtherDataVisible"
      @cancle="handleCancleImportOtherData"
    ></import-other-resume-data-dialog>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import ViewJsonDrawer from '@/views/createTemplate/designer/components/ViewJsonDrawer.vue';
  import ThemeStyleSettingDrawer from '@/views/createTemplate/designer/components/ThemeStyleSettingDrawer.vue';
  import { storeToRefs } from 'pinia';
  import { useGetSelectedModule } from '@/views/createTemplate/designer/hooks/useGetSelectedModule';
  import AddAnyModuleDrawer from './AddAnyModuleDrawer.vue';
  import SelectModuleTitleDialog from '@/views/createTemplate/designer/components/SelectModuleTitleDialog.vue';
  import ImportOtherResumeDataDialog from './ImportOtherResumeDataDialog.vue';

  const { selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);

  // 该模块是否有moduleTitle
  const isModuleTitle = computed(() => {
    const selectModule = useGetSelectedModule(selectedModuleId.value);
    if (
      selectModule.customProps.hasOwnProperty('ModuleTitleCpt') &&
      selectModule.customProps.ModuleTitleCpt
    ) {
      return true;
    }
    return false;
  });

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
  const pageDrawer = ref<boolean>(false);
  const openPageJSON = () => {
    pageDrawer.value = true;
  };
  const closePageJsonDrawer = () => {
    pageDrawer.value = false;
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

  // 添加任意模块抽屉
  const addModuleDrawer = ref<boolean>(false);
  const openAddModuleDrawer = () => {
    addModuleDrawer.value = !addModuleDrawer.value;
  };

  // 关闭添加模块抽屉
  const handleCloseAddModuleDrawer = () => {
    addModuleDrawer.value = false;
  };

  // 打开切换模块title弹窗
  const dialogModuleTitleVisible = ref<boolean>(false);
  const selectModuleTitle = () => {
    dialogModuleTitleVisible.value = true;
  };

  // 关闭切换模块标题弹窗
  const handleCancleModuleTitle = () => {
    dialogModuleTitleVisible.value = false;
  };

  // 打开导入已有简历数据弹窗
  const dialogImportOtherDataVisible = ref<boolean>(false);
  const openImportOtherData = () => {
    dialogImportOtherDataVisible.value = true;
  };

  // 关闭导入已有简历数据弹窗
  const handleCancleImportOtherData = () => {
    dialogImportOtherDataVisible.value = false;
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
