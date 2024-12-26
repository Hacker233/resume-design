<template>
  <div :style="boxStyle">
    <!-- 第一根线条 -->
    <div :style="firstLine"></div>
    <!-- 第二根线条 -->
    <div :style="secondLine"></div>
    <div class="base-info-box">
      <!-- 左侧画布 -->
      <div class="left-canvas">
        <div :style="leftTopBox"></div>
        <div :style="leftBottomBox"></div>
      </div>
      <div :style="userInfoBlock">
        <!-- 姓名简介整体样式 -->
        <div :style="nameAbstractBox">
          <!-- 姓名 -->
          <hj-name-1 v-if="module.props.name.show" :module="module"></hj-name-1>
          <!-- 一句话简介 -->
          <hj-abstract-1 v-if="module.props.abstract.show" :module="module"></hj-abstract-1>
        </div>
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

  // 第一根线条样式
  const firstLine = useGetCustomStyle(props.module, 'firstLine');

  // 第二根线条样式
  const secondLine = useGetCustomStyle(props.module, 'secondLine');

  // 左侧上方块
  const leftTopBox = useGetCustomStyle(props.module, 'leftTopBox');

  // 左侧下方块
  const leftBottomBox = useGetCustomStyle(props.module, 'leftBottomBox');

  // 信息模块样式
  const userInfoBlock = useGetCustomStyle(props.module, 'userInfoBlock');

  // 姓名简介整体样式
  const nameAbstractBox = useGetCustomStyle(props.module, 'nameAbstractBox');
</script>
<style lang="scss" scoped>
  .base-info-box {
    display: flex;
    width: 100%;
    .left-canvas {
      display: flex;
      flex-direction: column;
    }
  }
</style>
