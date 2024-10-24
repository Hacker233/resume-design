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
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    &:hover {
      box-shadow: 0 10px 22px 2px #00253a3d;
    }
    .module-component {
      cursor: move !important;
    }
  }
  .module-active {
    box-shadow: 0 10px 22px 2px #00253a3d;
    border: 1px dashed green;
  }
</style>
