<template>
  <div class="lego-designer-box">
    <!-- 导航栏 -->
    <lego-nav></lego-nav>

    <!-- 主设计区 -->
    <div class="main-designer-box">
      <!-- 物料列表区域 -->
      <left-com-list></left-com-list>
      <!-- 设计面板区域 -->
      <div class="designer-box"> </div>
      <!-- 设置器面板区域 -->
      <right-setter></right-setter>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import LegoNav from './components/LegoNav.vue';
  import LeftComList from './components/LeftComList.vue';
  import RightSetter from './components/RightSetter.vue';
</script>
<style lang="scss" scoped>
  .lego-designer-box {
    display: flex;
    flex-direction: column;
    height: 100vh;
    .main-designer-box {
      flex: 1;
      display: flex;
      justify-content: space-between;
      .designer-box {
        flex: 1;
        display: flex;
        justify-content: center;
        height: 100%;
      }
    }
  }
</style>
