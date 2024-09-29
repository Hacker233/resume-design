<template>
  <div class="create-template-box">
    <!-- 导航栏 -->
    <nav-bar></nav-bar>
    <!-- 内容区容器 -->
    <div class="content-wrapper">
      <!-- 左侧物料区 -->
      <div class="module-left">
        <!-- 模块选择 -->
        <module-select></module-select>
      </div>
      <!-- 中间设计区 -->
      <div class="design-center">
        <!-- 页面渲染 -->
        <component :is="pageComponents[pageComponent]" :style="HJNewJsonStore.css"></component>
      </div>
      <!-- 右侧属性面板区 -->
      <div class="prop-right"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import NavBar from './components/NavBar.vue';
  import ModuleSelect from './components/ModuleSelect.vue';
  import { storeToRefs } from 'pinia';
  import appStore from '@/store';
  import pageComponents from './utils/registerPages';

  // 初始化JSON数据
  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);

  // 返回page组件
  const pageComponent = computed(() => {
    if (HJNewJsonStore.value.props.page) {
      return HJNewJsonStore.value.props.page;
    } else {
      return 'CommonPage';
    }
  });
  console.log('pageComponents', pageComponents);
</script>
<style lang="scss" scoped>
  .create-template-box {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    .content-wrapper {
      width: 100%;
      flex: 1;
      display: flex;
      .module-left {
        height: 100%;
        width: 400px;
        background-color: #fff;
        // box-shadow: 0 1px 4px rgba(0, 0, 0, 0.16);
      }
      .design-center {
        height: calc(100vh - 50px);
        flex: 1;
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
      }
      .prop-right {
        height: 100%;
        min-width: 400px;
        background-color: #fff;
        // box-shadow: -1px 0 4px rgba(0, 0, 0, 0.16);
      }
    }
  }
</style>
