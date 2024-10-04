<template>
  <draggable
    class="page-box"
    :list="HJNewJsonStore.componentsTree"
    animation="500"
    group="custom"
    :sort="true"
    item-key="id"
    :style="pageStyle"
  >
    <template #item="{ element }">
      <div
        v-contextmenu:contextmenu
        class="create-template-elemet"
        @contextmenu.prevent="handleContextMenu(element)"
      >
        <module-box :module="element"></module-box>
      </div>
    </template>
  </draggable>

  <!-- 右键菜单 -->
  <v-contextmenu ref="contextmenu">
    <v-contextmenu-item @click="handleContextMenuItem('copy')">复制组件</v-contextmenu-item>
    <v-contextmenu-item @click="handleContextMenuItem('delete')">删除组件</v-contextmenu-item>
  </v-contextmenu>
</template>
<script setup lang="ts">
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import draggable from 'vuedraggable';
  import ModuleBox from '../components/ModuleBox.vue';
  import { IModule } from '../../types/IHJNewSchema';
  import { useDeleteModule } from '../hooks/useDeleteModule';
  import { useCopyModule } from '../hooks/useCopyModule';
  import { useGetPageStyle } from '../hooks/useGetPageStyle';

  const { HJNewJsonStore, selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);

  // 返回页面样式
  const pageStyle = useGetPageStyle();

  // 点击右键菜单
  const handleContextMenuItem = (type: string) => {
    if (type === 'copy') {
      useCopyModule();
    } else if (type === 'delete') {
      useDeleteModule();
    }
  };

  // 右键
  const handleContextMenu = (element: IModule) => {
    console.log('右键', element);
    selectedModuleId.value = element.id;
  };
</script>
<style lang="scss" scoped>
  .page-box {
    width: 820px;
    min-height: 1160px;
  }
</style>
