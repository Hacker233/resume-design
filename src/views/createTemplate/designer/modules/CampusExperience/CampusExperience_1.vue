<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <module-title_3 v-if="module.props.title.show" :module="module"></module-title_3>
    <!-- 教育背景列表 -->
    <template v-for="(item, index) in module.dataSource.list.value" :key="index">
      <hj-campus-experience1
        :module="module"
        :data-source-item="item"
        :data-source-index="index"
      ></hj-campus-experience1>
    </template>
  </div>
</template>
<script setup lang="ts">
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import ModuleTitle_3 from '../ModuleTitle/ModuleTitle_3.vue';
  import HjCampusExperience1 from '../components/hj-campus-experience-1.vue';

  const props = defineProps<{
    module: IModule;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);

  console.log('教育背景列表', props.module.dataSource);
</script>
<style lang="scss" scoped></style>
