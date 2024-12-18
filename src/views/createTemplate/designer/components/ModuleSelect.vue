<!-- 模块选择 -->
<template>
  <div class="module-select-list">
    <div class="module-select">
      <div v-if="showTitle" class="left-title" @click="selectNone">
        <span>模块</span>
        <span>选择</span>
      </div>
      <c-scrollbar trigger="hover">
        <ul>
          <li
            v-for="(val, index) in modulesList"
            :key="index"
            :class="[{ active: selectedModuleListId === val.id }]"
            @click="selectModel(val)"
          >
            <svg-icon :icon-name="val.icon" color="#2cbd99" size="25px"></svg-icon>
            <p>{{ val.moduleChName }}</p>
          </li>
        </ul>
      </c-scrollbar>
    </div>
    <div class="module-list-box">
      <!-- 模块列表标题 -->
      <div v-if="showTitle" class="list-title">
        <h1>{{ currentModuleListObj.moduleChName || '请选择模块' }}</h1>
      </div>
      <template v-if="selectedModuleListId">
        <!-- 模块列表图 -->
        <c-scrollbar v-if="currentModuleListObj.list.length" trigger="hover">
          <div v-viewer class="list-box">
            <!-- 拖拽组件 -->
            <draggable
              class="dragArea list-group"
              :sort="false"
              :list="currentModuleListObj.list"
              :clone="cloneData"
              chosen-class="chosen"
              :group="{ name: 'custom', pull: 'clone', put: false }"
              item-key="id"
              @start="start"
            >
              <template #item="{ element }">
                <div class="img-box" :style="getImgBoxStyle(element?.screenShot)">
                  <img
                    :src="
                      getImgListStyleImageFile(
                        element?.screenShot.url ? element?.screenShot.url : element?.screenShot.name
                      )
                    "
                    alt="图片"
                    lazy
                  />
                  <!-- 组件的name -->
                  <span v-if="showModuleName" class="module-component-name">{{
                    element.componentName
                  }}</span>
                </div>
              </template>
            </draggable>
          </div>
        </c-scrollbar>
        <!-- 没有选中组件时展示 -->
        <div v-else class="no-data">
          <no-data width="150px" height="150px"></no-data>
        </div>
      </template>

      <!-- 没有选中组件时展示 -->
      <div v-else class="no-data">
        <no-data width="150px" height="150px"></no-data>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import modulesList from '../schema/index';
  import appStore from '@/store';
  import { getImgListStyleImageFile } from '../utils/getImgListStyleImageFile';
  import draggable from 'vuedraggable';
  import { IModule } from '../../types/IHJNewSchema';
  import { cloneDeep } from 'lodash';
  import { getUuid } from '@/utils/common';
  import NoData from './NoData.vue';
  import customCss from '../schema/customCss/index';

  interface IModuleSelect {
    showTitle?: boolean;
    showModuleName?: boolean;
  }
  withDefaults(defineProps<IModuleSelect>(), {
    showTitle: true,
    showModuleName: true
  });

  const { selectedModuleListId } = storeToRefs(appStore.useCreateTemplateStore);
  selectedModuleListId.value = '';

  // 点击模块选择
  const currentModuleListObj = ref<any>({});
  const selectModel = (val: any) => {
    selectedModuleListId.value = val.id;
    currentModuleListObj.value = val;
  };

  // 重置模块
  const selectNone = () => {
    selectedModuleListId.value = '';
    currentModuleListObj.value = {};
  };

  // 获取图片盒子样式
  const getImgBoxStyle = (item: any) => {
    return {
      width: item.width
    };
  };

  // 拖拽时，初始化数据
  const cloneData = (data: IModule) => {
    const element = handleData(data);
    return element;
  };

  const start = (event: any) => {
    const element: any = handleData(currentModuleListObj.value.list[event.oldDraggableIndex]);
    event.originalEvent.dataTransfer?.setData('cptData', JSON.stringify(element));
  };

  // 组件数据
  const handleData = (data: IModule) => {
    const element = cloneDeep(data);
    element.id = getUuid();
    element.dataSource = {
      ...modulesList[element.category].dataSource,
      ...element.dataSource
    };
    element.css = {
      ...modulesList[element.category].css,
      ...element.css
    };
    element.props = {
      ...modulesList[element.category].props,
      ...element.props
    };

    element.customProps = {
      ...element.customProps,
      ...{
        showModule: true, // 是否展示模块
        unfoldModule: true // 是否展开模块
      }
    };
    // 添加模块标题的自定义样式
    if (element.customProps.hasOwnProperty('ModuleTitleCpt')) {
      const customCssKey: string = element.customProps.ModuleTitleCpt;
      const moduleTitleCustomCssArray = cloneDeep(customCss[customCssKey]);
      // 收集不在 element.customCss 中的元素
      const newItems: any[] = [];
      moduleTitleCustomCssArray.forEach((item2: any) => {
        const index = element.customCss.findIndex((item1: any) => item1.prop === item2.prop);
        if (index === -1) {
          newItems.push(cloneDeep(item2));
        } else {
          // 如果存在，替换 element.customCss 中的元素
          element.customCss[index] = cloneDeep(item2);
        }
      });
      // 将不在 element.customCss 中的元素整体插入到最前面
      element.customCss.unshift(...newItems);
    }
    return cloneDeep(element);
  };
</script>
<style lang="scss" scoped>
  .module-select-list {
    display: flex;
    width: 100%;
    height: 100%;
    .module-select {
      width: 65px;
      border-right: 1px solid #eee;
      flex-shrink: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      .left-title {
        width: 100%;
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        color: #2cbd99;
        box-sizing: border-box;
        user-select: none;
        cursor: pointer;
        span {
          font-size: 17px;
          font-weight: 600;
          font-family: cursive;
        }
      }
      ul {
        width: 100%;
        height: calc(100vh - 110px);
        li {
          list-style: none;
          width: 100%;
          height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          border-bottom: 1px solid #eee;
          cursor: pointer;
          transition: all 0.3s;
          user-select: none;
          &:hover {
            background-color: rgba(#2cbd99, 0.2);
          }
          p {
            font-size: 14px;
            color: #2cbd99;
            transform: scale(0.9);
          }
        }
        .active {
          background-color: rgba(#2cbd99, 0.2);
        }
      }
    }
    .module-list-box {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .list-title {
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
          letter-spacing: 4px;
          font-weight: bold;
        }
      }
      .list-box {
        width: 100%;
        padding: 20px;
        .dragArea {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .img-box {
          box-shadow: 0 10px 22px 2px #00253a3d;
          cursor: move;
          border: 1px dashed transparent;
          transition: all 0.3s;
          padding: 2px;
          margin-bottom: 15px;
          border-radius: 6px;
          position: relative;
          &:hover {
            border: 1px dashed green;
          }
          img {
            width: 100%;
          }
          .module-component-name {
            position: absolute;
            top: 0;
            right: 0px;
            font-size: 10px;
            background: #ff9971;
            color: #fff;
            padding: 2px 6px;
            border-radius: 0 0 0 8px;
          }
        }
      }
      .no-data {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .chosen {
      transform: rotate(5deg);
    }
  }
</style>
