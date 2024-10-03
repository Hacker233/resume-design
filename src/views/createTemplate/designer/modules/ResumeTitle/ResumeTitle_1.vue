<template>
  <div class="resume-title-box" :style="boxStyle">
    <div v-show="module.props.title" class="content-box">
      <div class="box"></div>
      <hj-p :p="module.dataSource.title"></hj-p>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import HjP from '../components/hj-p.vue';
  const props = defineProps<{
    module: IModule;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);
</script>
<style lang="scss" scoped>
  .resume-title-box {
    .content-box {
      display: flex;
      height: 100%;
      align-items: center;
      .box {
        height: 100%;
        width: 36px;
        background-color: #258bb1;
        margin-right: 18px;
      }
    }
  }
</style>
