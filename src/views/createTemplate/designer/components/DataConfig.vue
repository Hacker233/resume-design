<template>
  <c-scrollbar trigger="hover" style="height: calc(100vh - 50px)">
    <div class="data-config-box">
      <div
        v-for="moduleItem in HJNewJsonStore.componentsTree"
        :key="moduleItem.id"
        class="module-box"
      >
        <!-- 模块标题 -->
        <div class="module-title-box">
          <data-title-left :id="moduleItem.id"></data-title-left>
          <data-title-right
            :id="moduleItem.id"
            @open-style-drawer="handleOpenStyleDrawer"
          ></data-title-right>
        </div>

        <!-- 模块数据填写区域 -->
        <div class="module-content-box">
          <!-- 组件 -->
          <div
            v-for="(value, key, dataIndex) in moduleItem.dataSource"
            :key="dataIndex"
            class="module-filed-box"
          >
            <component
              :is="dataSourceCptMap[value.type]"
              :id="moduleItem.id"
              :key-value="key"
            ></component>
          </div>
        </div>
      </div>

      <!-- 模块样式设置弹窗 -->
      <module-style-setting-drawer
        :drawer="styleDrawer"
        @close-style-drawer="handleCloseDrawer"
      ></module-style-setting-drawer>
    </div>
  </c-scrollbar>
</template>

<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import dataSourceCptMap from '../setters/components/index';
  import DataTitleLeft from './DataTitleLeft.vue';
  import DataTitleRight from './DataTitleRight.vue';
  import ModuleStyleSettingDrawer from './ModuleStyleSettingDrawer.vue';

  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);

  // 打开模块样式设置抽屉
  const styleDrawer = ref<boolean>(false);
  const handleOpenStyleDrawer = () => {
    styleDrawer.value = true;
  };

  // 关闭弹窗
  const handleCloseDrawer = () => {
    styleDrawer.value = false;
  };
</script>

<style lang="scss" scoped>
  .data-config-box {
    height: 100%;
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
    .module-box {
      .module-title-box {
        margin-bottom: 20px;
        height: 50px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .module-content-box {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .module-filed-box {
          width: 49%;
        }
      }
    }
  }
</style>
