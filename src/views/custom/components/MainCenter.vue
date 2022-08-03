<template>
  <div class="main-center-box">
    <!-- 设计区域 -->
    <div class="center-box"> 
      <template v-for="item in components" >
        <component :is="item.cptName"></component>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const components = reactive<any>([]); // 定义组件列表
</script>
<style lang="scss" scoped>
  .main-center-box {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
    height: calc(100vh - 50px);
    overflow: auto;
    padding: 30px 0;
    box-sizing: border-box;
    .center-box {
      width: 820px;
      min-height: 1160px;
      background-color: #fff;
    }
  }
</style>
