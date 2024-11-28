<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <slot name="module-title"></slot>
    <div :style="userInfoAvatar">
      <!-- 个人信息 -->
      <div :style="userInfoBlock">
        <!-- 姓名 -->
        <hj-name-1 v-if="module.props.name.show" :module="module"></hj-name-1>
        <!-- 一句话简介 -->
        <hj-abstract-1 v-if="module.props.abstract.show" :module="module"></hj-abstract-1>
        <!-- 基本资料 -->
        <hj-user-base-info-1 :module="module"></hj-user-base-info-1>
      </div>
      <!-- 头像 -->
      <hj-avatar-1 v-if="module.props.avatar.show" :module="module"></hj-avatar-1>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';
  // 子组件
  import hjAvatar1 from '../components/hj-avatar-1.vue';
  import hjName1 from '../components/hj-name-1.vue';
  import hjAbstract1 from '../components/hj-abstract-1.vue';
  import hjUserBaseInfo1 from '../components/hj-user-base-info-1.vue';
  const props = defineProps<{
    module: IModule;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);
  // 信息和头像整体样式
  const userInfoAvatar = useGetCustomStyle(props.module, 'userInfoAvatar');

  // 信息模块样式
  const userInfoBlock = useGetCustomStyle(props.module, 'userInfoBlock');
</script>
