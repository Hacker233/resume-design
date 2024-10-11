<template>
  <div :style="boxStyle">
    <!-- 头像 -->
    <hj-avatar-1 v-show="module.props.avatar.show" :module="module"></hj-avatar-1>
    <div :style="userInfoBlock">
      <!-- 基本资料 -->
      <hj-user-base-info-2 :module="module"></hj-user-base-info-2>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';
  // 子组件
  import hjAvatar1 from '../components/hj-avatar-1.vue';
  import hjUserBaseInfo2 from '../components/hj-user-base-info-2.vue';
  const props = defineProps<{
    module: IModule;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);

  // 信息模块样式
  const userInfoBlock = useGetCustomStyle(props.module, 'userInfoBlock');
</script>
