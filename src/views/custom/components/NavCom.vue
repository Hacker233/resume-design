<template>
  <nav class="nav-box">
    <div class="nav-left">
      <img src="@/assets/logo.png" alt="logo" srcset="" @click="toHome" />
      <span @click="toHome">化简</span>
    </div>
  </nav>
</template>
<script lang="ts" setup>
  // 跳转到首页
  const router = useRouter();
  const toHome = () => {
    router.push({
      path: '/'
    });
  };
</script>
<style lang="scss" scoped>
  .nav-box {
    height: 50px;
    width: 100%;
    background-color: #fff;
    position: sticky;
    top: 0;
    display: flex;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 5%);
    .nav-left {
      width: 300px;
      display: flex;
      align-items: center;
      user-select: none;
      img {
        width: 60px;
        height: 60px;
        margin-left: 30px;
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
</style>
