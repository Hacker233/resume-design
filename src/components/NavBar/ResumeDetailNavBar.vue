<!-- 首页标题栏 -->
<template>
  <div class="nav-bar-box background-nav">
    <logo-com></logo-com>
  </div>
</template>
<script setup lang="ts">
  import LogoCom from '@/components/LogoCom/LogoCom.vue';
</script>
<style lang="scss" scoped>
  .background-nav {
    // 增强毛玻璃效果
    backdrop-filter: blur(16px); // 增加模糊强度
    -webkit-backdrop-filter: blur(12px); // Safari 和其他 WebKit 浏览器
    background-color: rgba(255, 255, 255, 0.5); // 半透明背景（浅色）
    // background-color: rgba(0, 0, 0, 0.3); // 半透明背景（深色）
  }
  .nav-bar-box {
    display: flex;
    height: 65px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    user-select: none;
    padding: 0 20px 0 30px;
    top: 0;
    transition: all 0.3s;
    position: sticky;
  }
</style>
