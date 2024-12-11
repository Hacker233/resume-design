<template>
  <p v-dompurify-html="module.dataSource.content.value" :style="abstract"></p>
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
