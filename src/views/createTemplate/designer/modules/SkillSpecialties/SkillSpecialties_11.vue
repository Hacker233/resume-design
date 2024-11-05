<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <module-title_8 v-if="module.props.title.show" :module="module"></module-title_8>
    <!-- 技能特长列表 -->
    <hj-skill-specialties-2 :module="module"></hj-skill-specialties-2>
  </div>
</template>
<script setup lang="ts">
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import ModuleTitle_8 from '../ModuleTitle/ModuleTitle_8.vue';
  import hjSkillSpecialties2 from '../components/hj-skill-specialties-2.vue';

  const props = defineProps<{
    module: IModule;
  }>();
  // 返回样式
  const boxStyle = useGetBoxStyle(props);
</script>
