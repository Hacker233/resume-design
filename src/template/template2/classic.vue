<template>
  <div class="classic-box">
    <div class="left"></div>
    <div class="right"></div>
  </div>
</template>
<script setup lang="ts">
  import { useResumeJsonStore } from '@/store/resume';
  import { storeToRefs } from 'pinia';

  const { resumeJsonStore } = storeToRefs(useResumeJsonStore()); // 简历数据
</script>
<script lang="ts">
  export default {
    name: 'classic'
  };
</script>
<style lang="less">
  @import '../template1/style/options.less';
  .classic-box {
    display: flex;
    height: 100%;
    .left {
      width: 200px;
      background-color: #254665;
      position: absolute;
      height: 100%;
      overflow: hidden;
    }
  }
</style>
