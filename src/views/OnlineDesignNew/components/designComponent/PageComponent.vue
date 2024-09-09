<template>
  <div class="page-box" :style="containerStyles">
    <!-- Draggable 容器 -->
    <Draggable
      :list="component.children"
      :group="{ name: 'components' }"
      :item-key="getItemKey"
      animation="500"
      ghost-class="dragging-ghost"
    >
      <template #item="{ element }">
        <ContainerComponent v-if="element.commentType === 'container'" :component="element" />
        <component
          :is="getWidgetCom(element)"
          v-else
          class="drag-component"
          :widget-data="element"
        ></component>
      </template>
    </Draggable>
  </div>
</template>

<script lang="ts" setup>
  import Draggable from 'vuedraggable';
  import ContainerComponent from './ContainerComponent.vue';
  import { IWidget } from '../../types';
  import { WIDGET_MAP } from '../../widgets';

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

  const getItemKey = (item: ComponentProps) => item.id;
</script>

<style scoped lang="scss">
  .page-box {
    position: relative; /* Ensure positioning for nested containers */
    overflow: hidden; /* Prevent overflow of content */
  }

  .dragging-ghost {
    opacity: 0.5;
  }

  .draggable-item {
    display: flex;
    align-items: center;
  }

  .drag-handle {
    width: 10px;
    height: 100%;
    background-color: #ccc;
    cursor: grab;
    position: absolute; /* Ensure the handle does not affect the layout */
    left: 0;
    top: 0;
    z-index: 1; /* Make sure the handle is on top */
  }
</style>
