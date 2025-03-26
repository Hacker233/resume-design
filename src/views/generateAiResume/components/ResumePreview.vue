<template>
  <div class="page-wrapper">
    <!-- 动态渲染的组件，添加ref -->
    <component :is="pageComponents[HJNewJsonStore.props.pageName]" :preview="true"></component>
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import pageComponents from '@/views/createTemplate/designer/utils/registerPages';
  import appStore from '@/store';

  // 初始化JSON数据
  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
</script>
<style lang="scss" scoped>
  .page-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 1160px; /* 自动调整高度 */
    transition: height 0.3s ease; // 可选，添加过渡效果
    width: 820px;
    margin: 0 auto;
    overflow: hidden;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 30px rgba(143, 102, 214, 0.25), inset 0 0 20px rgba(143, 102, 214, 0.15);
  }
</style>
