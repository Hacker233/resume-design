<template>
  <Draggable
    :style="containerStyles"
    class="container-drag-area"
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
        class="drag-component"
        :widget-data="element"
      ></component>
    </template>
  </Draggable>
</template>

<script lang="ts" setup>
  import Draggable from 'vuedraggable';
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
</script>

<style scoped lang="scss">
  .drag-component {
    cursor: move;
    border: 2px dashed transparent;
    transition: all 0.3s;
    display: inline-block;
    &:hover {
      border-color: #80e0c8;
    }
  }
</style>
