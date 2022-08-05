<template>
  <div class="main-center-box">
    <!-- 设计区域 -->
    <div
      class="center-box"
      @dragenter="handleDragenter"
      @dragover="handleDragover"
      @drop="handleDrop"
    >
      <!-- 常规布局 -->
      <template v-for="item in componentsList">
        <component
          class="mode-item"
          :is="components[item.cptName]"
          :style="getDynamicStyle(item)"
        ></component>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IMATERIALITEM } from '@/interface/material.js';

  defineProps<{
    components: any;
  }>();
  const componentsList = reactive<any>([]); // 定义组件列表

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
    cptData.cptWidth = '100%';
    componentsList.push(cptData);
    console.log('源对象在目标对象上松手', evt, cptData);
  };

  const getDynamicStyle = (item: IMATERIALITEM) => {
    return {
      width: item.cptWidth
    };
  };
</script>
<style lang="scss" scoped>
  .main-center-box {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
    height: calc(100vh - 50px);
    overflow: auto;
    padding: 30px 0;
    box-sizing: border-box;
    .center-box {
      width: 820px;
      min-height: 1160px;
      background-color: #fff;
      position: relative;
      z-index: 0;
      .mode-item {
      }
    }
  }
</style>
