<template>
  <h1 v-dompurify-html="module.dataSource.name.value" :style="name"></h1>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';

  const props = defineProps<{
    module: IModule;
  }>();

  // 姓名样式
  const name = useGetCustomStyle(props.module, 'name');
</script>
