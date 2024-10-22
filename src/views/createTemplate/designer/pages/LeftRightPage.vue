<template>
  <div :style="pageStyle">
    <!-- 左侧 -->
    <draggable
      :list="leftList"
      animation="500"
      group="custom"
      :sort="true"
      :style="leftStyle"
      placeholder-class="drop-placeholder"
      item-key="id"
    >
      <template #item="{ element }">
        <div class="create-template-elemet">
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
        <div class="create-template-elemet">
          <module-box :module="element"></module-box>
        </div>
      </template>
    </draggable>
  </div>
</template>
<script setup lang="ts">
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import draggable from 'vuedraggable';
  import ModuleBox from '../components/ModuleBox.vue';
  import { IModule } from '../../types/IHJNewSchema';
  import { useGetPageStyle } from '../hooks/useGetPageStyle';
  import { useGetCustomStyle } from '../hooks/useGetCustomStyle';

  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);

  // 返回页面样式
  const pageStyle = useGetPageStyle();

  // 返回左侧自定义样式
  const leftStyle = useGetCustomStyle(HJNewJsonStore.value, 'left');

  // 返回右侧自定义样式
  const rightStyle = useGetCustomStyle(HJNewJsonStore.value, 'right');

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
  console.log('初始化左右布局列表', leftStyle, rightStyle);

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
