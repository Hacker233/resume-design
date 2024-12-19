<template>
  <div class="data-config-box">
    <!-- 数据整体操作 -->
    <div class="data-config-title-box">
      <div class="left">
        <el-popover placement="bottom" :width="400" trigger="click">
          <template #reference>
            <div>
              <el-tooltip effect="light" content="模块快捷操作" placement="bottom">
                <svg-icon icon-name="icon-mobanguanli" color="#74a274" size="28px"></svg-icon>
              </el-tooltip>
            </div>
          </template>
          <!-- 快捷操作列表 -->
          <div class="module-fast--popver-content-box">
            <div
              v-for="(moduleItem, index) in HJNewJsonStore.componentsTree"
              :key="moduleItem.id"
              class="module-item"
            >
              <div class="left-title">{{ moduleItem.title }}</div>
              <data-title-right
                :id="moduleItem.id"
                :module="moduleItem"
                :is-unfold="moduleItem.customProps.unfoldModule"
                :is-show-module="moduleItem.customProps.showModule"
                @open-style-drawer="handleOpenStyleDrawer"
                @handle-unfold="handleUnfold(index)"
                @handle-collapse="handleCollapse(index)"
                @handle-change-switch="handleChangeSwitch($event, index)"
              ></data-title-right>
            </div>
          </div>
        </el-popover>
      </div>
      <div class="right">
        <!-- 展开收起所有 -->
        <div class="unfold-box-all" @click="openAll">
          <span>{{ isOpenAll ? '展开所有' : '收起所有' }}</span>
          <svg-icon
            :class="['open-all-icon', { 'open-all': isOpenAll }]"
            icon-name="icon-z044"
            color="#74a274"
            size="13px"
          />
        </div>
      </div>
    </div>
    <c-scrollbar trigger="always" style="height: 100%; background-color: #fff">
      <template v-for="(moduleItem, index) in HJNewJsonStore.componentsTree" :key="moduleItem.id">
        <div
          :ref="(el) => getDataModuleRef(el, moduleItem)"
          :class="['module-box', { 'module-select': selectedModuleId === moduleItem.id }]"
          @click="handleSelectDataModule(moduleItem)"
        >
          <!-- 模块标题 -->
          <div
            :class="[
              'module-title-box',
              { 'module-title-box-unfold': !moduleItem.customProps.unfoldModule }
            ]"
          >
            <data-title-left :id="moduleItem.id"></data-title-left>
            <data-title-right
              :id="moduleItem.id"
              :module="moduleItem"
              :is-unfold="moduleItem.customProps.unfoldModule"
              :is-show-module="moduleItem.customProps.showModule"
              @open-style-drawer="handleOpenStyleDrawer"
              @handle-unfold="handleUnfold(index)"
              @handle-collapse="handleCollapse(index)"
              @handle-change-switch="handleChangeSwitch($event, index)"
            ></data-title-right>
          </div>

          <!-- 模块数据填写区域 -->
          <template v-if="moduleItem">
            <div v-show="moduleItem.customProps.unfoldModule" class="module-content-box">
              <template v-for="(value, key, dataIndex) in moduleItem.dataSource" :key="dataIndex">
                <!-- 列表组件 -->
                <template v-if="value.type === 'list'">
                  <div :style="getFiledStyle(value)">
                    <hj-list :id="moduleItem.id" :key-value="key"></hj-list>
                  </div>
                </template>
                <!-- 非列表组件 -->
                <template v-else>
                  <div v-if="moduleItem.props[key].config" :style="getFiledStyle(value)">
                    <component
                      :is="dataSourceCptMap[value.type]"
                      v-model="moduleItem.dataSource[key].value"
                      :label="moduleItem.dataSource[key].label"
                      :key-value="key"
                      :module="moduleItem"
                      :disabled="!moduleItem.props[key].config"
                    >
                      <!-- 组件图标 -->
                      <template #label-left>
                        <icon-select-pop
                          v-if="moduleItem.props[key].iconfont"
                          v-model="moduleItem.props[key].iconfont"
                          size="18px"
                        ></icon-select-pop>
                      </template>
                      <!-- 组件类型切换 -->
                      <template #component-switch>
                        <component-type-pop
                          v-model="moduleItem.dataSource[key].type"
                          :content="moduleItem.dataSource[key]"
                          :type="value.type"
                          @editor-switch="handleEditorSwitch($event, moduleItem.dataSource[key])"
                        ></component-type-pop>
                      </template>
                      <!-- 组件开关 -->
                      <template #label-right>
                        <div class="field-label-right-box">
                          <el-switch
                            v-model="moduleItem.props[key].show"
                            :disabled="!moduleItem.props[key].config"
                          />
                        </div>
                      </template>
                    </component>
                  </div>
                </template>
              </template>
            </div>
          </template>
        </div>
      </template>

      <!-- 模块样式设置弹窗 -->
      <module-style-setting-drawer
        :drawer="styleDrawer"
        @close-style-drawer="handleCloseDrawer"
      ></module-style-setting-drawer>
    </c-scrollbar>
  </div>
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
  import hjList from '../setters/components/hj-list.vue'; // 数据配置，列表组件
  import IconSelectPop from '@/components/IconSelectPop/IconSelectPop.vue';
  import ComponentTypePop from './ComponentTypePop.vue';

  const { HJNewJsonStore, selectedModuleId, moduleDataConfigRefList } = storeToRefs(
    appStore.useCreateTemplateStore
  );

  const { dataConfigScrollToView } = appStore.useCreateTemplateStore;
  // 打开模块样式设置抽屉
  const styleDrawer = ref<boolean>(false);
  const handleOpenStyleDrawer = () => {
    styleDrawer.value = true;
  };

  // 关闭弹窗
  const handleCloseDrawer = () => {
    styleDrawer.value = false;
  };

  // 返回显示展开所有还是显示收起所有
  const isOpenAll = computed(() => {
    for (let i = 0; i < HJNewJsonStore.value.componentsTree.length; i++) {
      const element = HJNewJsonStore.value.componentsTree[i];
      if (!element.customProps.unfoldModule) {
        return true;
      }
    }
    return false;
  });

  // 意见展开全部或者收起所有
  const openAll = () => {
    if (isOpenAll.value) {
      for (let i = 0; i < HJNewJsonStore.value.componentsTree.length; i++) {
        HJNewJsonStore.value.componentsTree[i].customProps.unfoldModule = true;
      }
    } else {
      for (let i = 0; i < HJNewJsonStore.value.componentsTree.length; i++) {
        HJNewJsonStore.value.componentsTree[i].customProps.unfoldModule = false;
      }
    }
  };

  // 监听selectedModuleId变化
  watch(
    () => selectedModuleId.value,
    (newVal) => {
      // 如果选中了模块
      if (newVal) {
        dataConfigScrollToView;
      }
    },
    {
      deep: true
    }
  );

  watch(
    () => HJNewJsonStore.value.componentsTree,
    async (newVal) => {
      if (newVal) {
        // 如果选中了模块
        // dataConfigScrollToView();
      }
    },
    {
      deep: true
    }
  );

  // 通过ref获取元素
  const getDataModuleRef = (el: ComponentPublicInstance | null | Element, moduleItem: IModule) => {
    if (el) {
      moduleDataConfigRefList.value[moduleItem.id] = {
        id: moduleItem.id,
        el: el
      };
    }
  };

  // 选中模块
  const handleSelectDataModule = (moduleItem: IModule) => {
    selectedModuleId.value = moduleItem.id;
  };

  // 返回数据填写组件样式
  const getFiledStyle = (value: any) => {
    return {
      width: value.props.width
    };
  };

  // 收起
  const handleUnfold = (index: number) => {
    HJNewJsonStore.value.componentsTree[index].customProps.unfoldModule = false;
  };
  // 展开
  const handleCollapse = (index: number) => {
    HJNewJsonStore.value.componentsTree[index].customProps.unfoldModule = true;
  };

  // 显示或隐藏
  const handleChangeSwitch = (value: boolean, index: number) => {
    HJNewJsonStore.value.componentsTree[index].customProps.showModule = value;
  };

  // 如果是富文本组件切换至其他组件
  const handleEditorSwitch = (value: string, item: any) => {
    console.log('富文本组件切换至其他组件', value, item);
    item.value = value;
  };
</script>

<style lang="scss" scoped>
  .data-config-box {
    height: 100%;
    width: 100%;
    // padding: 40px 20px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    .data-config-title-box {
      width: 100%;
      height: 50px;
      flex-shrink: 0;
      background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      .left {
        .svg-icon {
          cursor: pointer;
          padding: 3px;
          transition: all 0.3s;
          &:hover {
            background-color: #eee;
            border-radius: 4px;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        .unfold-box-all {
          font-size: 14px;
          cursor: pointer;
          color: #74a274;
          transition: all 0.3s;
          user-select: none;
          &:hover {
            opacity: 0.7;
          }
          .open-all-icon {
            margin-left: 5px;
            transition: all 0.3s;
          }
          .open-all {
            transform: rotate(180deg);
          }
        }
      }
    }

    .module-box {
      flex: 1;
      transition: all 0.3s;
      border-radius: 10px;
      cursor: pointer;
      border: 1px solid #f0f0f0;
      margin: 20px;
      overflow: hidden;

      &:hover {
        box-shadow: 0 1px 9px 10px rgba(0, 0, 0, 0.02);
      }

      .module-title-box {
        height: 65px;
        // margin-bottom: 20px;
        height: 50px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: all 0.3s;
        padding: 0 20px;
        box-sizing: border-box;
        background-image: linear-gradient(135deg, #fdfcfb 0%, #f1e5dc 100%);
      }
      .module-title-box-unfold {
        border-bottom: 1px solid transparent;
      }

      .module-content-box {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 20px 20px;
        box-sizing: border-box;
        .module-filed-box {
          width: 49%;
        }
        .module-list-filed-box {
          width: 100%;
        }
        transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
      }
    }

    .module-select {
      border-radius: 10px;
      box-shadow: 0 1px 9px 10px rgba(0, 0, 0, 0.04);
    }
  }
</style>
<style lang="scss">
  .module-fast--popver-content-box {
    .module-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      padding: 10px 0;
      .left-title {
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
</style>
