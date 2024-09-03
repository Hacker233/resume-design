<template>
  <div class="page-box" :style="containerStyles">
    <!-- Draggable 容器 -->
    <Draggable
      v-model="localComponent.children"
      :group="{ name: 'components' }"
      animation="200"
      :item-key="getItemKey"
    >
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
  import { reactive, computed, watch } from 'vue';
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
  console.log('pages-localComponent', localComponent);
  // 抽取组件的 CSS 样式
  const containerStyles = computed(() => ({
    // width: `${localComponent.css.width || 0}px`,
    // height: `${localComponent.css.height || 0}px`,
    // backgroundColor: localComponent.css.backgroundColor || 'transparent',
    // borderWidth: `${localComponent.css.borderWidth || 0}px`,
    // borderRadius: `${localComponent.css.borderRadius || 0}px`,
    // borderColor: localComponent.css.borderColor || 'transparent',
    // borderStyle: localComponent.css.borderStyle || 'solid'
  }));

  // 监听 props.component 的变化，并同步更新 localComponent
  watch(
    () => props.component,
    (newVal) => {
      Object.assign(localComponent, newVal);
    }
  );

  // 返回每个项的唯一标识符
  const getItemKey = (item: ComponentProps) => item.id;
</script>

<style scoped>
  /* 可以在这里添加一些全局样式或 scoped 样式 */
</style>
