<template>
  <div class="admin-box">
    <!-- 导航栏 -->
    <div class="top">
      <div class="nav-left">
        <img src="@/assets/logo.png" alt="logo" srcset="" @click="toHome" />
        <span @click="toHome">化简</span>
      </div>
    </div>
    <div class="bottom">
      <!-- 左侧菜单 -->
      <left-menu></left-menu>
      <!-- 右侧内容 -->
      <div class="bottom-right">
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import LeftMenu from './leftMenu/index.vue';

  // 跳转到首页
  const router = useRouter();
  const toHome = () => {
    router.push({
      path: '/'
    });
  };
</script>
<style lang="scss" scoped>
  .admin-box {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
    .top {
      height: 50px;
      width: 100%;
      background-color: #fff;
      position: sticky;
      top: 0;
      display: flex;
      justify-content: space-between;
      box-shadow: 0 5px 21px 0 rgb(78 78 78 / 5%);
      box-sizing: border-box;
      .nav-left {
        width: 210px;
        display: flex;
        align-items: center;
        user-select: none;
        padding-left: 30px;
        box-sizing: border-box;
        img {
          width: 60px;
          height: 60px;
          cursor: pointer;
        }
        span {
          letter-spacing: 4px;
          font-size: 22px;
          font-weight: 600;
          font-family: cursive;
          color: green;
          cursor: pointer;
        }
      }
    }
    .bottom {
      display: flex;
      flex: 1;
      .bottom-right {
        flex: 1;
        height: 100%;
        box-sizing: border-box;
        padding: 15px;
        overflow: auto;
        .content {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          background-color: #fff;
          padding: 15px;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
