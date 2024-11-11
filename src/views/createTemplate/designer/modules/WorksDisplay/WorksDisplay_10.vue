<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <module-title_3 v-if="module.props.title.show" :module="module"></module-title_3>
    <!-- 作品展示列表 -->
    <hj-works-display-1 :module="module"></hj-works-display-1>
  </div>
</template>
<script setup lang="ts">
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import ModuleTitle_3 from '../ModuleTitle/ModuleTitle_3.vue';
  import hjWorksDisplay1 from '../components/hj-works-display-1.vue';
  const props = defineProps<{
    module: IModule;
  }>();
  // 返回样式
  const boxStyle = useGetBoxStyle(props);
</script>
<style lang="scss" scoped></style>
