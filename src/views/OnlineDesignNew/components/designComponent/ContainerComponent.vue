<template>
  <div class="container-box" :style="containerStyles">
    <Draggable
      style="width: 100%; height: 100%"
      :list="component.children"
      :group="{ name: 'components' }"
      :item-key="getItemKey"
      animation="500"
      ghost-class="dragging-ghost"
      :class="{ 'drop-target': isDropTarget }"
      @move="handleMove"
      @change="handleChange"
      @add="handleAdd"
      @update="handleUpdate"
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
  import { ref, computed } from 'vue';
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

  const getItemKey = (item: ComponentProps) => item.id;

  const isDropTarget = ref(false); // 标记目标容器

  const handleMove = (event: any) => {
    const { relatedContext } = event;

    // 检查 relatedContext 并防止容器移动
    if (
      relatedContext &&
      relatedContext.element &&
      relatedContext.element.commentType === 'container'
    ) {
      isDropTarget.value = true;
    } else {
      isDropTarget.value = false;
    }
  };

  const handleChange = () => {
    isDropTarget.value = false;
  };

  const handleAdd = (evt: any) => {
    // 确保插入位置
    console.log(evt);
  };

  const handleUpdate = (evt: any) => {
    // 更新时确保容器不乱动
    console.log(evt);
  };
</script>

<style scoped lang="scss">
  .container-box {
    position: relative;
    overflow: hidden;
  }

  .dragging-ghost {
    opacity: 0.5;
  }

  .drop-target {
    border: 2px dashed #00aaff; /* 蓝色虚线边框提示 */
  }
</style>
