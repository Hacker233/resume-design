<template>
  <div :style="pageStyle">
    <!-- 左侧 -->
    <draggable
      :list="leftList"
      animation="500"
      group="custom"
      :sort="true"
      :style="leftStyle"
      item-key="id"
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
    <!-- 右侧 -->
    <draggable
      :list="rightList"
      animation="500"
      group="custom"
      :sort="true"
      :style="rightStyle"
      item-key="id"
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
  </div>

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
  import { useGetCustomStyle } from '../hooks/useGetCustomStyle';

  const { HJNewJsonStore, selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);

  // 返回页面样式
  const pageStyle = useGetPageStyle();

  // 返回左侧自定义样式
  const leftStyle = useGetCustomStyle(HJNewJsonStore.value, 'left');

  // 返回右侧自定义样式
  const rightStyle = useGetCustomStyle(HJNewJsonStore.value, 'right');

  // 点击右键菜单
  const handleContextMenuItem = (type: string) => {
    if (type === 'copy') {
      useCopyModule();
    } else if (type === 'delete') {
      useDeleteModule();
    }
    initList();
  };

  // 右键
  const handleContextMenu = (element: IModule) => {
    console.log('右键', element);
    selectedModuleId.value = element.id;
  };

  // 左右布局列表，当列表变化时，更新componentsTree列表
  const leftList = ref<any>([]);
  const rightList = ref<any>([]);

  // 初始化leftList和rightList
  const initList = () => {
    leftList.value = HJNewJsonStore.value.componentsTree.filter(
      (item) => item.customProps.layout === 'left'
    );
    // 右侧列表
    rightList.value = HJNewJsonStore.value.componentsTree.filter(
      (item) => item.customProps.layout === 'right'
    );
  };
  initList();

  watch(
    () => leftList.value,
    () => {
      leftList.value.forEach((item: IModule) => {
        item.customProps.layout = 'left';
      });
      HJNewJsonStore.value.componentsTree = leftList.value.concat(rightList.value);
      console.log('最新的HJNewJsonStore', HJNewJsonStore.value);
    },
    {
      deep: true
    }
  );
  watch(
    () => rightList.value,
    () => {
      rightList.value.forEach((item: IModule) => {
        item.customProps.layout = 'left';
      });
      HJNewJsonStore.value.componentsTree = leftList.value.concat(rightList.value);
      console.log('最新的HJNewJsonStore', HJNewJsonStore.value);
    },
    {
      deep: true
    }
  );
</script>
