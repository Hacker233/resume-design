<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <module-title_2 :module="module"></module-title_2>
    <div :style="userInfoBlock">
      <!-- 基本资料 -->
      <hj-user-base-info-3 :module="module"></hj-user-base-info-3>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';
  import hjUserBaseInfo3 from '../components/hj-user-base-info-3.vue';
  import ModuleTitle_2 from '../ModuleTitle/ModuleTitle_2.vue';
  const props = defineProps<{
    module: IModule;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);

  // 信息模块样式
  const userInfoBlock = useGetCustomStyle(props.module, 'userInfoBlock');
</script>
