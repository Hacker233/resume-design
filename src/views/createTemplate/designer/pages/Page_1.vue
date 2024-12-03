<template>
  <draggable
    class="page-box"
    :list="HJNewJsonStore.componentsTree"
    animation="500"
    group="custom"
    :sort="true"
    item-key="id"
    :style="pageStyle"
    :disabled="preview"
    ghost-class="page-ghost"
    @drop="handleDrop"
  >
    <template #item="{ element }">
      <div :ref="(el) => getDataModuleRef(el, element)" class="create-template-elemet">
        <module-box :module="element" :preview="preview"></module-box>
      </div>
    </template>
  </draggable>

  <!-- 四周线条 -->
  <div class="line-top">
    <div :style="topLeftStyle"></div>
    <div :style="topRightStyle"></div>
  </div>
  <div :style="lineLeftStyle"> </div>
  <div :style="lineRightStyle"> </div>
  <div class="line-bottom">
    <div :style="bottomLeftStyle"></div>
    <div :style="bottomRightStyle"></div>
  </div>
</template>
<script setup lang="ts">
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import draggable from 'vuedraggable';
  import ModuleBox from '../components/ModuleBox.vue';
  import { useGetPageStyle } from '../hooks/useGetPageStyle';
  import { ComponentPublicInstance } from 'vue';
  import { IModule } from '../../types/IHJNewSchema';
  import { useGetCustomStyle } from '../hooks/useGetCustomStyle';

  defineProps<{
    preview: boolean;
  }>();

  const { HJNewJsonStore, selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);

  // 返回页面样式
  const pageStyle = useGetPageStyle();

  // 返回顶部左侧样式
  const topLeftStyle = useGetCustomStyle(HJNewJsonStore.value, 'topLeftStyle');

  // 返回顶部右侧样式
  const topRightStyle = useGetCustomStyle(HJNewJsonStore.value, 'topRightStyle');

  // 返回左侧线条样式
  const lineLeftStyle = useGetCustomStyle(HJNewJsonStore.value, 'lineLeftStyle');

  // 返回右侧线条样式
  const lineRightStyle = useGetCustomStyle(HJNewJsonStore.value, 'lineRightStyle');

  // 返回底部左侧样式
  const bottomLeftStyle = useGetCustomStyle(HJNewJsonStore.value, 'bottomLeftStyle');

  // 返回底部右侧样式
  const bottomRightStyle = useGetCustomStyle(HJNewJsonStore.value, 'bottomRightStyle');

  const handleDrop = (event: any) => {
    event.dataTransfer?.getData('cptData');
  };

  // 监听selectedModuleId变化
  watch(
    () => selectedModuleId.value,
    (newVal) => {
      // 如果选中了模块
      if (newVal && moduleDataConfigRefList[newVal]) {
        setTimeout(() => {
          moduleDataConfigRefList[newVal].el.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          }); // 该模块显示在可视区域内
        }, 0);
      }
    },
    {
      deep: true
    }
  );

  // 通过ref获取元素
  const moduleDataConfigRefList = reactive<any>({});
  const getDataModuleRef = (el: ComponentPublicInstance | null | Element, moduleItem: IModule) => {
    if (el) {
      moduleDataConfigRefList[moduleItem.id] = {
        id: moduleItem.id,
        el: el
      };
    }
  };
</script>
<style lang="scss" scoped>
  .create-template-elemet {
    width: 100%;
  }
  .line-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    height: 30px;
    padding: 0;
    display: flex;
    align-items: center;
  }
  .line-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    height: 30px;
    padding: 0;
    display: flex;
    align-items: center;
  }
</style>
<style lang="scss">
  .page-ghost {
    img {
      width: 100% !important;
    }
    .module-component-name {
      display: none !important;
    }
  }
</style>
