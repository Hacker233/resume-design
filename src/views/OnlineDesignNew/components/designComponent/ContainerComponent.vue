<template>
  <div class="container-box" :style="containerStyles">
    <!-- Draggable 容器 -->
    <Draggable
      :list="component.children"
      :group="{ name: 'components' }"
      animation="500"
      :item-key="getItemKey"
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

  import { WIDGET_MAP } from '../../widgets';
  import { IWidget } from '../../types';

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
    borderStyle: props.component.css.borderStyle || 'solid',
    marginTop: props.component.css.top || 'solid',
    marginBottom: props.component.css.bottom || 'solid',
    marginLeft: props.component.css.left || 'solid',
    marginRight: props.component.css.right || 'solid'
  }));

  const getWidgetCom = (item: IWidget) => {
    return WIDGET_MAP[item.componentName];
  };

  const getItemKey = (item: ComponentProps) => item.id;
</script>

<style scoped>
  /* 可以在这里添加一些全局样式或 scoped 样式 */
</style>
