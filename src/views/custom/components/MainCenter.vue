<template>
  <c-scrollbar trigger="hover">
    <div class="main-center-box">
      <!-- 设计区域 -->
      <div
        class="center-box"
        @dragenter="handleDragenter"
        @dragover="handleDragover"
        @drop="handleDrop"
      >
        <!-- 常规布局 -->
        <template v-for="(item, index) in designJsonStore.components">
          <component
            :class="['mode-item', { isHover: hoverIndex === index }]"
            :is="components[item.cptName]"
            :modelData="item.data"
            :modelStyle="item.style"
            :style="getDynamicStyle(item)"
            @mouseover="handleMouseover(index)"
            @mouseleave="handleMouseleave"
          ></component>
        </template>
      </div>
    </div>
  </c-scrollbar>
</template>
<script lang="ts" setup>
  import { IMATERIALITEM } from '@/interface/material.js';
  import MODEL_DATA_JSON from '@/schema/modelData';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { CScrollbar } from 'c-scrollbar'; // 滚动条

  defineProps<{
    components: any;
  }>();

  // store相关数据
  const { designJsonStore } = storeToRefs(appStore.useDesignStore);
  const { pushComponent } = appStore.useDesignStore;

  // 源对象进入目标对象时
  const handleDragenter = (evt: DragEvent) => {
    console.log('目标对象被源对象拖动着进入', evt);
  };

  // 源对象悬停在目标对象上时
  const handleDragover = (evt: DragEvent) => {
    evt.preventDefault();
    // console.log('源对象悬停在目标对象上时', evt);
  };

  // 源对象在目标对象上松手
  const handleDrop = (evt: DragEvent) => {
    let cptData: IMATERIALITEM = JSON.parse(evt.dataTransfer?.getData('cptData') as string);
    // 处理组件数据
    // cptData.cptWidth = '100%';
    cptData.data = MODEL_DATA_JSON[cptData.model]; // 为模块添加数据
    pushComponent(cptData); // 添加模块
    console.log('源对象在目标对象上松手', evt, cptData);
  };

  // 添加样式
  const getDynamicStyle = (item: IMATERIALITEM) => {
    return {
      width: item.cptWidth
    };
  };

  // 鼠标移入效果
  const hoverIndex = ref<number>(-1);
  const handleMouseover = (index: number) => {
    hoverIndex.value = index;
  };
  const handleMouseleave = () => {
    hoverIndex.value = -1;
  };
</script>
<style lang="scss" scoped>
  .main-center-box {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
    height: calc(100vh - 50px);
    padding: 30px 0;
    box-sizing: border-box;
    .center-box {
      width: 820px;
      min-height: 1160px;
      background-color: #fff;
      padding: 30px 45px;
      box-sizing: border-box;
      position: relative;
      z-index: 0;
      .mode-item {
        border: 1px dashed transparent;
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        user-select: none;
        &:hover {
          border: 1px dashed #7ec97e;
          cursor: move;
        }
      }
      .isHover {
        position: relative;
        &::after {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: rgba($color: #000000, $alpha: 0.1);
        }
      }
    }
  }
</style>
