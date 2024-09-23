<template>
  <Draggable
    :style="containerStyles"
    :class="['container-drag-area', { selected: selectedWidgetId === component.id }]"
    :list="component.children"
    :group="{ name: 'components' }"
    item-key="id"
    animation="500"
  >
    <template #item="{ element }">
      <ContainerComponent v-if="element.commentType === 'container'" :component="element" />
      <component
        :is="getWidgetCom(element)"
        v-else
        :class="['drag-component', { selected: selectedWidgetId === element.id }]"
        :widget-data="element"
        @click.stop="seleteComponent(element)"
      ></component>
    </template>
  </Draggable>
</template>

<script lang="ts" setup>
  import Draggable from 'vuedraggable';
  import { IWidget } from '../../types';
  import { WIDGET_MAP } from '../../widgets';
  import { storeToRefs } from 'pinia';
  import appStore from '@/store';

  interface ComponentProps {
    id: string;
    componentName: string;
    commentType: string;
    css: Record<string, any>;
    children: ComponentProps[];
  }

  const props = defineProps<{
    component: ComponentProps;
  }>();

  const containerStyles = computed(() => ({
    width: `${props.component.css.width || 0}px`,
    height: `${props.component.css.height || 0}px`,
    backgroundColor: props.component.css.backgroundColor || '#ffffff',
    borderWidth: `${props.component.css.borderWidth || 0}px`,
    borderRadius: `${props.component.css.borderRadius || 0}px`,
    borderColor: props.component.css.borderColor || 'transparent',
    borderStyle: props.component.css.borderStyle || 'solid'
  }));

  const getWidgetCom = (item: IWidget) => {
    return WIDGET_MAP[item.componentName];
  };

  // 选择组件
  const { selectedWidgetId } = storeToRefs(appStore.useOnlineDesignNewSelectWidgetStore); // 选中的组件id
  const seleteComponent = (element: any) => {
    selectedWidgetId.value = element.id;
    console.log('点击组件', element);
  };
</script>

<style scoped lang="scss">
  .container-drag-area {
    cursor: move;
    border: 2px dashed transparent;
    transition: all 0.3s;
    display: inline-block;
    position: relative;
    transition: transform 0.3s ease, box-shadow 0.3s ease; // 添加过渡效果
    &:hover {
      border-color: #80e0c8;
    }
  }
  .drag-component {
    cursor: move;
    border: 2px dashed transparent;
    transition: all 0.3s;
    position: relative;
    &:hover {
      border-color: #80e0c8;
    }
  }
  .selected {
    border: 2px dashed green !important;
  }
</style>
