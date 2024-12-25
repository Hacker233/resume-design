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
        <el-popover placement="bottom" :width="400" trigger="click">
          <template #reference>
            <div>
              <el-tooltip effect="light" content="快速添加模块" placement="bottom">
                <svg-icon
                  icon-name="icon-zengjiatianjiajiahao"
                  color="#74a274"
                  size="28px"
                ></svg-icon>
              </el-tooltip>
            </div>
          </template>
          <!-- 模块列表选择 -->
          <div class="module-selected--popver-content-box">
            <div
              v-for="(value, key) in userAddModule"
              :key="key"
              :class="[
                'add-module-item',
                { existence: existenceModule.indexOf(value.category) > -1 }
              ]"
              @click="handleAddModule(value)"
            >
              <el-tooltip
                effect="light"
                content="已有该模块"
                placement="bottom"
                :disabled="existenceModule.indexOf(value.category) < 0"
              >
                <div>
                  <svg-icon
                    :icon-name="value.icon"
                    :color="existenceModule.indexOf(value.category) > -1 ? '#ccc' : '#606266'"
                    size="16px"
                  ></svg-icon>
                  <span>{{ value.moduleChName }}</span>
                </div>
              </el-tooltip>
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
  import { userAddModule } from '../schema/index';
  import { useSetModuleSchema } from '../hooks/useSetModuleSchema';
  import { moduleTitleIconList, ModuleTitleScreenShotList } from '../modules/ModuleTitle';
  import { useGetSelectedModule } from '../hooks/useGetSelectedModule';
  import { cloneDeep } from 'lodash';

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

  // 统计使用最多的moduleTitle
  const mostModuleTitleCptName = computed(() => {
    const moduleTitleNameList: any = [];
    HJNewJsonStore.value.componentsTree.forEach((item: any) => {
      if (item.customProps.hasOwnProperty('ModuleTitleCpt')) {
        moduleTitleNameList.push({
          moduleId: item.id,
          moduleTitleName: item.customProps.ModuleTitleCpt
        });
      }
    });
    return getMostFrequentModuleTitleName(moduleTitleNameList);
  });

  const getMostFrequentModuleTitleName = (
    moduleTitleNameList: { moduleId: string; moduleTitleName: string }[]
  ) => {
    if (moduleTitleNameList.length === 0) {
      return null; // 如果数组为空，直接返回 null 或适合的默认值
    }

    // Step 1: 统计每个 moduleTitleName 出现的次数
    const titleCountMap: { [key: string]: number } = {};
    moduleTitleNameList.forEach((item) => {
      titleCountMap[item.moduleTitleName] = (titleCountMap[item.moduleTitleName] || 0) + 1;
    });

    // Step 2: 找出出现次数最多的 moduleTitleName
    let mostFrequentItem = moduleTitleNameList[0];
    let maxCount = titleCountMap[mostFrequentItem.moduleTitleName];

    moduleTitleNameList.forEach((item) => {
      const count = titleCountMap[item.moduleTitleName];
      if (count > maxCount) {
        mostFrequentItem = item;
        maxCount = count;
      }
    });

    // Step 3: 如果每个 moduleTitleName 都不同，则返回第一项
    return mostFrequentItem;
  };

  // 已经有了的模块
  const existenceModule = computed(() => {
    const existenceList = ref<any>([]);
    HJNewJsonStore.value.componentsTree.forEach((item: any) => {
      existenceList.value.push(item.category);
    });
    console.log('已添加模块', existenceList.value);
    return existenceList.value;
  });

  // 点击添加模块
  const handleAddModule = (value: any) => {
    if (existenceModule.value.indexOf(value.category) > -1) {
      return;
    }
    const data = value.list[0]; // 默认添加第一项
    // 设置模块标题，标题图标
    if (data.customProps.hasOwnProperty('ModuleTitleCpt')) {
      data.customProps.ModuleTitleCpt = mostModuleTitleCptName.value?.moduleTitleName; // 设置moduleTitleCpt
      // 查找对应模块标题的相关配置，这是图标
      const moduleConfig = ModuleTitleScreenShotList.find(
        (item: any) => item.cptName === data.customProps.ModuleTitleCpt
      );
      if (moduleConfig?.iconfont) {
        data.props.title.iconfont = moduleTitleIconList[data.category].titleIcon;
      }
    }
    const element = useSetModuleSchema(data);
    // 设置模块标题样式
    if (element.customProps.hasOwnProperty('ModuleTitleCpt')) {
      const copyModule = useGetSelectedModule(mostModuleTitleCptName.value?.moduleId);
      const copyCustomCss = cloneDeep(copyModule.customCss); // 需要拷贝模块的自定义样式
      const moduleTitleProp = [
        'moduleTitle',
        'moduleTitleFont',
        'moduleTitleIcon',
        'moduleTitleFontBox',
        'moduleTitleRightBox'
      ]; // 模块标题所有可能存在的prop
      const moduleCssList: any = [];
      copyCustomCss.forEach((item: any) => {
        if (moduleTitleProp.indexOf(item.prop) > -1) {
          moduleCssList.push(item);
        }
      });
      console.log('需要copy模块的标题样式', moduleCssList);
      // 将拷贝的样式替换调初始的样式
      const newItems: any[] = [];
      moduleCssList.forEach((item2: any) => {
        const index = element.customCss.findIndex((item1: any) => item1.prop === item2.prop);
        if (index === -1) {
          newItems.push(cloneDeep(item2));
        } else {
          // 如果存在，替换 selectModule.customCss 中的元素
          element.customCss[index] = cloneDeep(item2);
        }
      });

      // 将不在 selectModule.customCss 中的元素整体插入到最前面
      element.customCss.unshift(...newItems);
    }
    console.log('需要添加的模块', element);
    HJNewJsonStore.value.componentsTree.push(element);
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
        display: flex;
        align-items: center;
        .svg-icon {
          cursor: pointer;
          padding: 3px;
          transition: all 0.3s;
          margin-right: 10px;
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
  .module-selected--popver-content-box {
    display: grid; /* 启用 grid 布局 */
    grid-template-columns: repeat(3, 1fr); /* 每行最多显示 3 个元素，且每个元素占据相同的宽度 */
    gap: 15px 10px; /* 设置 grid 元素之间的间隙 */
    padding: 10px;
    .add-module-item {
      padding: 5px 15px;
      border-radius: 15px;
      background-color: antiquewhite;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.3s;
      border: 1px solid transparent;
      display: flex;
      align-items: center;
      font-size: 14px;
      &:hover {
        border: 1px solid rgb(224, 205, 182);
        opacity: 0.8;
      }
      .svg-icon {
        flex-shrink: 0;
        margin-right: 5px;
      }
    }
    .existence {
      cursor: not-allowed;
      background-color: rgb(243.9, 244.2, 244.8);
      color: rgb(188, 188, 189);
      &:hover {
        border: 1px solid transparent;
        opacity: 1;
      }
    }
  }
</style>
