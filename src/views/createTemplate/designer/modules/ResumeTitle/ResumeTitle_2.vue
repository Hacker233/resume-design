<template>
  <div class="resume-title-box" :style="boxStyle">
    <div v-show="module.props.title" :style="custom_css_1">
      <hj-p :p="module.dataSource.title"></hj-p>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import HjP from '../components/hj-p.vue';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';
  const props = defineProps<{
    module: IModule;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);

  // 返回自定义样式prop = custom_css_1
  const custom_css_1 = useGetCustomStyle(props.module, 'custom_css_1');
</script>
