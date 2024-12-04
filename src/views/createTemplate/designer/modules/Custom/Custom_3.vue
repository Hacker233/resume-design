<template>
  <div class="custom-3-box" :style="boxStyle">
    <!-- 头像 -->
    <hj-avatar-2 v-if="module.props.avatar.show" :module="module"></hj-avatar-2>
    <!-- 姓名 -->
    <hj-name-1 v-if="module.props.name.show" :module="module"></hj-name-1>
    <!-- 一句话简介 -->
    <hj-abstract-1 v-if="module.props.abstract.show" :module="module"></hj-abstract-1>
  </div>
</template>
<script setup lang="ts">
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import hjName1 from '../components/hj-name-1.vue';
  import hjAbstract1 from '../components/hj-abstract-1.vue';
  import hjAvatar2 from '../components/hj-avatar-2.vue';
  const props = defineProps<{
    module: IModule;
  }>();
  // 返回样式
  const boxStyle = useGetBoxStyle(props);
</script>
<style lang="scss" scoped>
  .custom-3-box {
    clip-path: ellipse(110% 100% at 50% 0%);
  }
</style>
