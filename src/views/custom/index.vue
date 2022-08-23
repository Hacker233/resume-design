<template>
  <div class="custom-resume-box">
    <!-- 导航栏 -->
    <nav-com @generate-report="generateReport"></nav-com>
    <!-- 主区 -->
    <div class="main-box">
      <!-- 左侧物料区 -->
      <main-left></main-left>
      <!-- 中间设计区 -->
      <main-center ref="mainCenterRef" :components="MaterialComponents"></main-center>
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
  import MaterialComponents from '@/utils/registerMaterialCom'; // 所有物料组件

  // 打印为pdf
  const mainCenterRef = ref<any>(null);
  const generateReport = () => {
    mainCenterRef.value.generateReport();
  };
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
      box-sizing: border-box;
    }
  }
</style>
