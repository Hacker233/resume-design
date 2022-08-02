<template>
  <div class="custom-resume-box">
    <!-- 导航栏 -->
    <nav-com></nav-com>
    <!-- 主区 -->
    <div class="main-box">
      <!-- 左侧物料区 -->
      <main-left></main-left>
      <!-- 中间设计区 -->
      <main-center></main-center>
      <!-- 右侧属性区 -->
      <main-right></main-right>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import NavCom from './components/NavCom.vue';
  import MainLeft from './components/MainLeft.vue';
  import MainCenter from './components/MainCenter.vue';
  import MainRight from './components/MainRight.vue';
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
