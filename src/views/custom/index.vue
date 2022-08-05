<template>
  <div class="custom-resume-box">
    <!-- 导航栏 -->
    <nav-com></nav-com>
    <!-- 主区 -->
    <div class="main-box">
      <!-- 左侧物料区 -->
      <main-left></main-left>
      <!-- 中间设计区 -->
      <main-center :components="components"></main-center>
      <!-- 右侧属性区 -->
      <main-right></main-right>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import NavCom from './components/NavCom.vue'; // 导航栏
  import MainLeft from './components/MainLeft.vue'; // 左侧区域
  import MainCenter from './components/MainCenter.vue'; // 中间区域
  import MainRight from './components/MainRight.vue'; // 右侧区域

  import EDU_BACKGROUND_1 from '@/material/EduBackground/EduBackground1/index.vue';
  import BASE_INFO_1 from '@/material/BaseInfo/BaseInfo1/index.vue';

  // 注册所有物料组件
  const components = {
    EDU_BACKGROUND_1: EDU_BACKGROUND_1,
    BASE_INFO_1: BASE_INFO_1
  };
  console.log('components', components);
</script>
<style lang="scss" scoped>
  .custom-resume-box {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .main-box {
      flex: 1;
      display: flex;
    }
  }
</style>
