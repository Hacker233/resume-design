<template>
  <div class="resume-title-box" :style="boxStyle">
    <div v-show="module.props.title" :style="inlineBlock">
      <hj-p-1 :p="module.dataSource.title"></hj-p-1>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import HjP1 from '../components/hj-p-1.vue';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';
  const props = defineProps<{
    module: IModule;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);

  // 返回自定义样式prop = inlineBlock
  const inlineBlock = useGetCustomStyle(props.module, 'inlineBlock');
</script>
