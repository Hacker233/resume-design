<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <module-title_10 v-if="module.props.title.show" :module="module"></module-title_10>
    <!-- 教育背景列表 -->
    <template v-for="(item, index) in module.dataSource.list.value" :key="index">
      <hj-awards-1
        :module="module"
        :data-source-item="item"
        :data-source-index="index"
      ></hj-awards-1>
    </template>
  </div>
</template>
<script setup lang="ts">
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import ModuleTitle_10 from '../ModuleTitle/ModuleTitle_10.vue';
  import hjAwards1 from '../components/hj-awards-1.vue';

  const props = defineProps<{
    module: IModule;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);
</script>
