<template>
  <div :style="pageStyle">
    <!-- 左侧 -->
    <draggable
      :list="leftList"
      animation="500"
      group="custom"
      :sort="true"
      :style="leftStyle"
      :disabled="preview"
      ghost-class="page-ghost"
      placeholder-class="drop-placeholder"
      item-key="id"
    >
      <template #item="{ element }">
        <div class="create-template-elemet">
          <module-box :module="element" :preview="preview"></module-box>
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
      :disabled="preview"
      ghost-class="page-ghost"
      item-key="id"
    >
      <template #item="{ element }">
        <div class="create-template-elemet">
          <module-box :module="element" :preview="preview"></module-box>
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

  defineProps<{
    preview: boolean;
  }>();

  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);

  // 返回页面样式
  const pageStyle = useGetPageStyle();

  // 返回左侧自定义样式
  const leftStyle = useGetCustomStyle(HJNewJsonStore.value, 'left');

  // 返回右侧自定义样式
  const rightStyle = useGetCustomStyle(HJNewJsonStore.value, 'right');

  // 左右布局列表
  const leftList = ref<any>([]);
  const rightList = ref<any>([]);

  // 初始化 leftList 和 rightList
  const initList = () => {
    leftList.value = HJNewJsonStore.value.componentsTree.filter(
      (item) => item.customProps.layout === 'left'
    );
    rightList.value = HJNewJsonStore.value.componentsTree.filter(
      (item) => item.customProps.layout === 'right'
    );
  };

  // 初始化时调用
  initList();

  // 确保组件新增时，添加默认布局属性
  const ensureLayoutProperty = (list: IModule[]) => {
    list.forEach((item) => {
      if (!item.customProps.layout) {
        // 分配默认布局：新增的组件可以默认归为 "left"
        item.customProps.layout = 'left';
      }
    });
  };

  // 监听组件树长度变化
  watch(
    () => HJNewJsonStore.value.componentsTree.length,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        console.log('组件树长度变化，重新初始化布局列表', newVal, oldVal);
        initList();
      }
    }
  );

  // 监听左侧列表变化
  watch(
    () => leftList.value,
    () => {
      ensureLayoutProperty(leftList.value); // 确保新增或复制的组件有默认 layout 属性
      leftList.value.forEach((item: IModule) => {
        item.customProps.layout = 'left';
      });
      HJNewJsonStore.value.componentsTree = leftList.value.concat(rightList.value);
      console.log('更新左侧列表到组件树', HJNewJsonStore.value);
    },
    { deep: true }
  );

  // 监听右侧列表变化
  watch(
    () => rightList.value,
    () => {
      ensureLayoutProperty(rightList.value); // 确保新增或复制的组件有默认 layout 属性
      rightList.value.forEach((item: IModule) => {
        item.customProps.layout = 'right';
      });
      HJNewJsonStore.value.componentsTree = leftList.value.concat(rightList.value);
      console.log('更新右侧列表到组件树', HJNewJsonStore.value);
    },
    { deep: true }
  );
</script>
