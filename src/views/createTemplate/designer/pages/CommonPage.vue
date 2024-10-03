<template>
  <draggable
    class="page-box"
    :list="HJNewJsonStore.componentsTree"
    animation="500"
    group="custom"
    :sort="true"
    item-key="id"
    :style="style"
  >
    <template #item="{ element }">
      <div v-contextmenu:contextmenu class="create-template-elemet">
        <module-box :module="getMergeElement(element)"></module-box>
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
  import modulesList from '../schema/module';
  import { IModule } from '../../types/IHJNewSchema';

  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);

  // 返回页面样式
  const style = computed(() => {
    return {
      width: `${HJNewJsonStore.value.css.width}px`,
      minHeight: `${HJNewJsonStore.value.css.height}px`,
      background: HJNewJsonStore.value.css.background || '#ffffff',
      opacity: HJNewJsonStore.value.css.opacity,
      backgroundImage: HJNewJsonStore.value.css.backgroundImage || '',
      fontFamily: HJNewJsonStore.value.css.fontFamily || ''
    };
  });

  // 合并数据
  const getMergeElement = (element: IModule) => {
    element.dataSource = {
      ...modulesList[element.category].dataSource,
      ...element.dataSource
    };
    element.css = {
      ...modulesList[element.category].css,
      ...element.css
    };
    element.props = {
      ...modulesList[element.category].props,
      ...element.props
    };
    return element;
  };

  // 右键
  const handleContextMenuItem = (type: string) => {
    console.log('右键菜单类型', type);
  };
</script>
<style lang="scss" scoped>
  .page-box {
    width: 820px;
    min-height: 1160px;
  }
</style>
