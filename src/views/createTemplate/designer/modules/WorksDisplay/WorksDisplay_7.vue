<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <module-title_8 v-if="module.props.title.show" :module="module"></module-title_8>
    <!-- 作品展示列表 -->
    <hj-works-display-1 :module="module"></hj-works-display-1>
  </div>
</template>
<script setup lang="ts">
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import ModuleTitle_8 from '../ModuleTitle/ModuleTitle_8.vue';
  import hjWorksDisplay1 from '../components/hj-works-display-1.vue';

  const props = defineProps<{
    module: IModule;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);
</script>
