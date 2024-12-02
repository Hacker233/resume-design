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
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import ViewJsonDrawer from '@/views/createTemplate/designer/components/ViewJsonDrawer.vue';
  import ThemeStyleSettingDrawer from '@/views/createTemplate/designer/components/ThemeStyleSettingDrawer.vue';
  import { storeToRefs } from 'pinia';
  import { useGetSelectedModule } from '@/views/createTemplate/designer/hooks/useGetSelectedModule';
  import AddAnyModuleDrawer from './AddAnyModuleDrawer.vue';

  const { selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);

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
