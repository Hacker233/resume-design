<template>
  <div class="create-template-box">
    <!-- 导航栏 -->
    <nav-bar></nav-bar>
    <!-- 内容区容器 -->
    <div class="content-wrapper">
      <!-- 左侧物料区 -->
      <div class="module-left">
        <module-select></module-select>
      </div>
      <!-- 中间设计区 -->
      <div class="design-center">
        <!-- 动态渲染的组件，添加ref -->
        <component :is="pageComponents[pageComponent]" ref="dynamicComponentRef"></component>
      </div>
      <!-- 右侧属性面板区 -->
      <div class="prop-right">
        <module-config></module-config>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
  import NavBar from './components/NavBar.vue';
  import ModuleSelect from './components/ModuleSelect.vue';
  import ModuleConfig from './components/ModuleConfig.vue';
  import { storeToRefs } from 'pinia';
  import appStore from '@/store';
  import pageComponents from './utils/registerPages';

  // 初始化JSON数据
  const { HJNewJsonStore, selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);

  // 返回page组件
  const pageComponent = computed(() => {
    return HJNewJsonStore.value.props.page || 'CommonPage';
  });

  // 动态组件的 ref
  const dynamicComponentRef = ref<any>(null);

  // 点击其他区域，取消模块选中
  const initClickListen = () => {
    window.addEventListener('click', dealClick);
  };

  const dealClick = (e: MouseEvent) => {
    const dynamicComponentEl = dynamicComponentRef.value?.$el || dynamicComponentRef.value;

    // 如果动态组件已渲染，并且点击目标不在该组件内
    if (
      dynamicComponentEl instanceof HTMLElement &&
      !dynamicComponentEl.contains(e.target as Node)
    ) {
      selectedModuleId.value = ''; // 取消选中
    }
  };

  // 生命周期钩子，绑定和解绑事件监听器
  onMounted(() => {
    initClickListen();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('click', dealClick);
  });
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
      }
      .design-center {
        height: calc(100vh - 50px);
        flex: 1;
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        min-width: 1000px;
      }
      .prop-right {
        height: 100%;
        width: 400px;
        background-color: #fff;
      }
    }
  }
</style>
