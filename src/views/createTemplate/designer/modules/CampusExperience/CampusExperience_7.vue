<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <slot name="module-title"></slot>
    <div style="flex: 1">
      <!-- 教育背景列表 -->
      <template v-for="(item, index) in module.dataSource.list.value" :key="index">
        <hj-campus-experience1
          :module="module"
          :data-source-item="item"
          :data-source-index="index"
        ></hj-campus-experience1>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import HjCampusExperience1 from '../components/hj-campus-experience-1.vue';

  const props = defineProps<{
    module: IModule;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);

  console.log('教育背景列表', props.module.dataSource);
</script>
<style lang="scss" scoped></style>
