<!-- 首页标题栏 -->
<template>
  <div class="nav-bar-box">
    <div class="logo">
      <img src="@/assets/logo.png" alt="logo" srcset="" />
      <span>化简</span>
    </div>
    <!-- GitHub -->
    <div class="right">
      <el-popover :width="200" trigger="click" teleported>
        <template #reference>
          <span class="contact-me">
            <svg-icon iconName="icon-lianxiwomen1" :color="iconColor" size="16px"></svg-icon>
            联系我
          </span>
        </template>
        <!-- 内容区域 -->
        <div class="vx-box">
          <div class="vx-title">
            <h1>添加微信</h1>
            <p>进入交流群，迅速解答疑问！</p>
          </div>
          <div class="vx-img">
            <img class="bgc-img" src="@/assets/images/vx.jpg" alt="" />
          </div>
        </div>
      </el-popover>

      <a
        href="https://gitee.com/sharemore52/resume-design"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg-icon iconName="icon-gitee-fill-round" :color="iconColor" size="31px"></svg-icon>
      </a>
      <a
        href="https://github.com/Hacker233/resume-design"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg-icon iconName="icon-github-fill" :color="iconColor" size="35px"></svg-icon>
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
<style lang="scss" scoped>
  .nav-bar-box {
    display: flex;
    height: 88px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    background-color: v-bind('bgColor');
    z-index: 10;
    user-select: none;
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
      display: flex;
      align-items: center;
      .contact-me {
        cursor: pointer;
        margin-right: 15px;
        font-size: 14px;
        color: v-bind('iconColor');
      }
      .svg-icon {
        cursor: pointer;
      }
      & :first-child {
        margin-left: 15px;
      }
    }
  }
  .vx-box {
    .vx-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      h1 {
        font-size: 14px;
        margin-bottom: 6px;
      }
      p {
        font-size: 12px;
        color: rgb(105, 105, 105);
      }
    }
    .vx-img {
      width: 100%;
      overflow: hidden;
      .bgc-img {
        width: 100%;
      }
    }
  }
</style>
