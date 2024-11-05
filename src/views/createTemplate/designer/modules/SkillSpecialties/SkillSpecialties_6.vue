<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <module-title_7 v-if="module.props.title.show" :module="module"></module-title_7>
    <!-- 技能特长列表 -->
    <hj-skill-specialties-1 :module="module"></hj-skill-specialties-1>
  </div>
</template>
<script setup lang="ts">
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import ModuleTitle_7 from '../ModuleTitle/ModuleTitle_7.vue';
  import hjSkillSpecialties1 from '../components/hj-skill-specialties-1.vue';

  const props = defineProps<{
    module: IModule;
  }>();
  // 返回样式
  const boxStyle = useGetBoxStyle(props);
</script>
