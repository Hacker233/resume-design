<!-- 组件渲染盒子 -->
<template>
  <div :class="['module-box', { 'module-active': isSelectedModule }]" @click="selectModule">
    <component
      :is="moduleComponents[module.componentName]"
      :module="module"
      class="module-component"
    ></component>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { IModule } from '../../types/IHJNewSchema';
  import moduleComponents from '../utils/registerModules';
  import { storeToRefs } from 'pinia';

  const props = defineProps<{
    module: IModule;
  }>();

  const isSelectedModule = computed(() => {
    return selectedModuleId.value && selectedModuleId.value === props.module.id;
  });

  console.log('module', props.module);
  const { selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);
  // 点击模块
  const selectModule = () => {
    selectedModuleId.value = props.module.id;
    console.log('选中的模块ID', selectedModuleId.value);
  };
</script>
<style lang="scss" scoped>
  .module-box {
    transition: all 0.3s;
    &:hover {
      border: 2px dashed green;
    }
    .module-component {
      cursor: move !important;
    }
  }
  .module-active {
    border: 2px dashed green;
  }
</style>
<style lang="scss">
  .v-contextmenu {
    z-index: 10001;
    border: none;
    .v-contextmenu-inner {
      padding: 0;
      width: 100px;
      border-radius: 5px;
      overflow: hidden;
      border: none;
      .v-contextmenu-item {
        padding: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 5px;
        border: none;
      }
      .v-contextmenu-item--hover {
        color: #fff;
        background-image: linear-gradient(to right, #2ddd9d, #1cc7cf);
        transition: all 0.1s;
      }
    }
  }
</style>
