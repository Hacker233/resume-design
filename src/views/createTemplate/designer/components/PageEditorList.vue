<template>
  <div class="page-editor-icon-list">
    <ul>
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
    <json-drawer
      :drawer="moduleDrawer"
      :json="moduleJson"
      @close-json-drawer="closeModuleJsonDrawer"
    ></json-drawer>

    <!-- 页面JSON -->
    <json-drawer
      :drawer="pageDrawer"
      :json="pageJson"
      @close-json-drawer="closePageJsonDrawer"
    ></json-drawer>
  </div>
</template>
<script lang="ts" setup>
  import FileSaver from 'file-saver';
  import appStore from '@/store';
  import JsonDrawer from './JsonDrawer.vue';
  import { useGetSelectedModule } from '../hooks/useGetSelectedModule';
  import { storeToRefs } from 'pinia';

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
