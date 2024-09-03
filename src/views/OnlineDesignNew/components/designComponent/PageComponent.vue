<template>
  <div class="page-box">
    <!-- Draggable 容器 -->
    <Draggable v-model="localComponent.children" :group="{ name: 'components' }" animation="200">
      <template #item="{ element }">
        <ContainerComponent v-if="element.commentType === 'container'" :component="element" />
        <div v-else>
          <!-- 其他组件渲染 -->
        </div>
      </template>
    </Draggable>
  </div>
</template>

<script lang="ts" setup>
  import Draggable from 'vuedraggable';
  import ContainerComponent from './ContainerComponent.vue';

  // 定义 Props 的类型
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

  // 创建一个本地的 reactive 对象来存储 component 数据
  const localComponent = reactive({ ...props.component });

  // 如果 props.component 发生变化，同步更新 localComponent
  watch(
    () => props.component,
    (newVal) => {
      Object.assign(localComponent, newVal);
    }
  );
</script>

<style scoped>
  /* 可以在这里添加一些全局样式或 scoped 样式 */
</style>
