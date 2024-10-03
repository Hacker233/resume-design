<template>
  <div class="resume-title-box" :style="boxStyle">
    <div v-show="module.props.title" class="box">
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
    .box {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 0 15px;
      background-color: #ff9916;
    }
  }
</style>
