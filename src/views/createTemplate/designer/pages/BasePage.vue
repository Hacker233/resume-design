<template>
  <draggable
    class="page-box"
    :list="HJNewJsonStore.componentsTree"
    animation="500"
    group="custom"
    :sort="true"
    item-key="id"
    :style="pageStyle"
    ghost-class="page-ghost"
    @drop="handleDrop"
  >
    <template #item="{ element }">
      <div class="create-template-elemet">
        <module-box :module="element"></module-box>
      </div>
    </template>
  </draggable>
</template>
<script setup lang="ts">
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import draggable from 'vuedraggable';
  import ModuleBox from '../components/ModuleBox.vue';
  import { useGetPageStyle } from '../hooks/useGetPageStyle';

  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);

  // 返回页面样式
  const pageStyle = useGetPageStyle();

  const handleDrop = (event: any) => {
    event.dataTransfer?.getData('cptData');
    console.log('drop', event.dataTransfer?.getData('cptData'));
  };
</script>
<style lang="scss" scoped>
  .create-template-elemet {
    width: 100%;
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
