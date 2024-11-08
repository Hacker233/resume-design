<template>
  <p :style="abstract">{{ module.dataSource.content.value }}</p>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';

  const props = defineProps<{
    module: IModule;
  }>();

  // 简介样式
  const abstract = useGetCustomStyle(props.module, 'abstract');
</script>
