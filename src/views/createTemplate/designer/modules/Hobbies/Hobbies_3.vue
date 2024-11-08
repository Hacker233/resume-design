<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <module-title_5 v-if="module.props.title.show" :module="module"></module-title_5>
    <!-- 求职意向列表 -->
    <hj-hobbies-1 :module="module"></hj-hobbies-1>
  </div>
</template>
<script setup lang="ts">
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import ModuleTitle_5 from '../ModuleTitle/ModuleTitle_5.vue';
  import hjHobbies1 from '../components/hj-hobbies-1.vue';

  const props = defineProps<{
    module: IModule;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);
</script>
<style lang="scss" scoped></style>
