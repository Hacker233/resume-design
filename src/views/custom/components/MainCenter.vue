<template>
  <c-scrollbar trigger="hover">
    <div class="main-center-box">
      <!-- 设计区域 -->
      <div
        class="center-box"
        @dragenter="handleDragenter"
        @dragover="handleDragover"
        @dragleave="handleDragleave"
        @drop="handleDrop"
      >
        <!-- 常规布局 -->
        <template v-for="(item, index) in designJsonStore.components">
          <model-box :components="components" :item="item"></model-box>
        </template>
        <!-- 拖拽提示 -->
        <!-- <div class="drag-tip-box" v-show="isShowDragTip">
          <svg-icon iconName="icon-jia" className="yulan" size="50px" color="#2ddd9d"></svg-icon>
          <p>组件将会放置在此处~</p>
        </div> -->
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
  import ModelBox from './ModelBox.vue';

  defineProps<{
    components: any;
  }>();

  // store相关数据
  const { designJsonStore } = storeToRefs(appStore.useDesignStore);
  const { pushComponent } = appStore.useDesignStore;

  // 源对象进入目标对象时
  const isShowDragTip = ref<boolean>(false); // 是否显示拖拽提示
  const handleDragenter = (evt: DragEvent) => {
    console.log('目标对象被源对象拖动着进入', evt);
  };

  // 源对象悬停在目标对象上时
  const handleDragover = (evt: DragEvent) => {
    evt.preventDefault();
    // console.log('源对象悬停在目标对象上时', evt);
  };

  // 拖拽对象离开
  const handleDragleave = (evt: DragEvent) => {
    console.log('拖拽对象离开', evt);
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
</script>
<style lang="scss" scoped>
  .c-scrollbar {
    flex: 1;
  }
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
      .drag-tip-box {
        width: 100%;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-content: center;
        background-color: rgba(#2ddd9d, 0.2);
        border-radius: 10px;
        border: 2px dashed #2ddd9d;
        p {
          font-size: 16px;
          color: #2ddd9d;
          margin-top: 20px;
        }
      }
    }
  }
</style>
