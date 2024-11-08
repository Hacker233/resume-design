<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <module-title_8 v-if="module.props.title.show" :module="module"></module-title_8>
    <!-- 实习经验列表 -->
    <template v-for="(item, index) in module.dataSource.list.value" :key="index">
      <hj-internship-experience1
        :module="module"
        :data-source-item="item"
        :data-source-index="index"
      ></hj-internship-experience1>
    </template>
  </div>
</template>
<script setup lang="ts">
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import ModuleTitle_8 from '../ModuleTitle/ModuleTitle_8.vue';
  import hjInternshipExperience1 from '../components/hj-internship-experience-1.vue';
  const props = defineProps<{
    module: IModule;
  }>();
  // 返回样式
  const boxStyle = useGetBoxStyle(props);
</script>
