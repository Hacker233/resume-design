<template>
  <c-scrollbar trigger="hover" style="height: calc(100vh - 50px)">
    <div class="data-config-box">
      <template v-for="moduleItem in HJNewJsonStore.componentsTree" :key="moduleItem.id">
        <div
          :ref="(el) => getDataModuleRef(el, moduleItem)"
          :class="['module-box', { 'module-select': selectedModuleId === moduleItem.id }]"
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
      </template>

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
  import { IModule } from '../../types/IHJNewSchema';
  import { ComponentPublicInstance } from 'vue';

  const { HJNewJsonStore, selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);

  // 打开模块样式设置抽屉
  const styleDrawer = ref<boolean>(false);
  const handleOpenStyleDrawer = () => {
    styleDrawer.value = true;
  };

  // 关闭弹窗
  const handleCloseDrawer = () => {
    styleDrawer.value = false;
  };

  // 监听selectedModuleId变化
  watch(
    () => selectedModuleId.value,
    (newVal) => {
      // 如果选中了模块
      if (newVal && moduleRefList[newVal]) {
        setTimeout(() => {
          moduleRefList[newVal].el.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 该模块显示在可视区域内
        }, 0);
      }
    },
    {
      deep: true
    }
  );

  // 通过ref获取元素
  const moduleRefList = reactive<any>({});
  const getDataModuleRef = (el: ComponentPublicInstance | null | Element, moduleItem: IModule) => {
    if (el) {
      moduleRefList[moduleItem.id] = {
        id: moduleItem.id,
        el: el
      };
    }
  };
</script>

<style lang="scss" scoped>
  .data-config-box {
    height: 100%;
    width: 100%;
    padding: 40px 20px;
    box-sizing: border-box;
    .module-box {
      padding: 10px 20px;
      transition: all 0.3s;
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
    .module-select {
      border-radius: 10px;
      margin: 5px 0;
      box-shadow: 0 1px 9px 10px rgba(0, 0, 0, 0.04);
    }
  }
</style>
