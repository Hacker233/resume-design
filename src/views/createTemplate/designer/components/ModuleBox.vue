<!-- 组件渲染盒子 -->
<template>
  <div
    v-if="module.customProps.showModule"
    :class="[
      'module-box',
      { 'module-active': isSelectedModule && !preview, 'module-box-preview': preview }
    ]"
    @click="selectModule"
  >
    <component
      :is="moduleComponents[module.componentName]"
      :module="module"
      :class="['module-component', { 'module-preview': preview }]"
    >
      <!-- 模块标题组件 -->
      <template v-if="module.customProps?.hasOwnProperty('ModuleTitleCpt')" #module-title>
        <component
          :is="ModuleTitleCpt[module.customProps.ModuleTitleCpt]"
          v-if="module.props.title.show"
          :module="module"
        ></component>
      </template>
    </component>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { IModule } from '../../types/IHJNewSchema';
  import moduleComponents from '../utils/registerModules';
  import { storeToRefs } from 'pinia';
  import ModuleTitleCpt from '../modules/ModuleTitle/index';
  import { useGetSelectedModule } from '../hooks/useGetSelectedModule';

  const props = defineProps<{
    module: IModule;
    preview: boolean;
  }>();

  const isSelectedModule = computed(() => {
    return selectedModuleId.value && selectedModuleId.value === props.module.id;
  });

  const { selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);
  const { dataConfigScrollToView } = appStore.useCreateTemplateStore;
  const selectModule = () => {
    if (props.preview) {
      return;
    }
    selectedModuleId.value = props.module.id;
    const module = useGetSelectedModule(selectedModuleId.value);
    module.customProps.unfoldModule = true; // 直接展开
    dataConfigScrollToView();
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
    .module-preview {
      cursor: inherit !important;
    }
  }
  .module-box-preview {
    &:hover {
      box-shadow: none;
    }
  }
  .module-active {
    box-shadow: 0 10px 22px 2px #00253a3d;
    border: 1px dashed green;
  }
</style>
