<template>
  <div :style="boxStyle">
    <div :style="userInfoBlock">
      <!-- 姓名 -->
      <hj-name-1
        v-show="module.props.name.show"
        :name="module.dataSource.name"
        :style="name"
      ></hj-name-1>
      <!-- 一句话简介 -->
      <hj-abstract-1
        v-show="module.props.abstract.show"
        :abstract="module.dataSource.abstract"
        :style="abstract"
      ></hj-abstract-1>
      <!-- 基本资料 -->
      <hj-user-base-info-1 :module="module" :style="userBaseInfo"></hj-user-base-info-1>
    </div>
    <hj-avatar-1
      v-show="module.props.avatar.show"
      :module="module"
      :custom-css="avatar"
    ></hj-avatar-1>
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
  console.log('baseinfo样式', boxStyle);

  // 返回自定义样式
  const avatar = useGetCustomStyle(props.module, 'avatar');

  // 姓名样式
  const name = useGetCustomStyle(props.module, 'name');

  // 信息模块样式
  const userInfoBlock = useGetCustomStyle(props.module, 'userInfoBlock');

  // 简介样式
  const abstract = useGetCustomStyle(props.module, 'abstract');

  // 基础资料样式
  const userBaseInfo = useGetCustomStyle(props.module, 'userBaseInfo');
</script>
