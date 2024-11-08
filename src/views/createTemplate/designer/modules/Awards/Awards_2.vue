<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <module-title_4 v-if="module.props.title.show" :module="module"></module-title_4>
    <!-- 教育背景列表 -->
    <template v-for="(item, index) in module.dataSource.list.value" :key="index">
      <hj-awards-2
        :module="module"
        :data-source-item="item"
        :data-source-index="index"
      ></hj-awards-2>
    </template>
  </div>
</template>
<script setup lang="ts">
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import ModuleTitle_4 from '../ModuleTitle/ModuleTitle_4.vue';
  import hjAwards2 from '../components/hj-awards-2.vue';

  const props = defineProps<{
    module: IModule;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);

  console.log('教育背景列表', props.module.dataSource);
</script>
<style lang="scss" scoped></style>
