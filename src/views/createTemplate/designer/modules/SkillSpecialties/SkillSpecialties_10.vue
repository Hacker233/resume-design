<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <module-title_11 v-if="module.props.title.show" :module="module"></module-title_11>
    <!-- 技能特长列表 -->
    <hj-skill-specialties-1 :module="module"></hj-skill-specialties-1>
  </div>
</template>
<script setup lang="ts">
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import ModuleTitle_11 from '../ModuleTitle/ModuleTitle_11.vue';
  import hjSkillSpecialties1 from '../components/hj-skill-specialties-1.vue';
  const props = defineProps<{
    module: IModule;
  }>();
  // 返回样式
  const boxStyle = useGetBoxStyle(props);
</script>
