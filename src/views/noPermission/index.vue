<template>
  <div class="no-permission-page">
    <img src="@/assets/images/no-permission.svg" alt="" srcset="" />
    <p>您暂无权限访问此页面！</p>
  </div>
</template>
<style lang="scss" scoped>
  .no-permission-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
    img {
      width: 50vw;
      max-width: 600px;
    }
    p {
      font-size: 20px;
      letter-spacing: 2px;
      margin-top: -50px;
      color: red;
    }
  }
</style>
