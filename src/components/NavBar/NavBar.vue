<!-- 首页标题栏 -->
<template>
  <div class="nav-bar-box">
    <div class="logo">
      <img src="@/assets/logo.png" alt="logo" srcset="" />
      <span>化繁为简</span>
    </div>
    <!-- GitHub -->
    <div class="right">
      <a
        href="https://github.com/Hacker233/resume-design"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg-icon iconName="icon-github-fill" :color="iconColor"></svg-icon>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
  interface IBgcColor {
    bgColor?: string;
    fontColor?: string;
    iconColor?: string;
  }
  withDefaults(defineProps<IBgcColor>(), {
    bgColor: '',
    fontColor: '',
    iconColor: '#fff'
  });
</script>
<style lang="less" scoped>
  .nav-bar-box {
    display: flex;
    height: 88px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    background-color: v-bind('bgColor');
    z-index: 10;
    padding: 0 40px;
    position: fixed;
    top: 0;
    transition: all 0.3s;
    .logo {
      height: 100%;
      display: flex;
      align-items: center;
      img {
        width: 80px;
        height: 80px;
      }
      span {
        letter-spacing: 4px;
        font-size: 22px;
        font-weight: 600;
        font-family: cursive;
        color: v-bind('fontColor');
      }
    }
    .right {
      .svg-icon {
        font-size: 35px;
        cursor: pointer;
      }
    }
  }
</style>
