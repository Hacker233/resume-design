<template>
  <div class="project-introduce-box">
    <div class="left">
      <h1>一款开源的、免费的简历设计神器</h1>
      <p>快速设计、无后台、确保数据不会泄露，支持一键导出PDF、JSON数据。</p>
    </div>
    <div class="right">
      <img class="bgc-img" src="@/assets/images/index.png" alt="" />
    </div>
  </div>
</template>
<style lang="less" scoped>
  .project-introduce-box {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    background: #f4c4f3; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #fc67fa,
      #f4c4f3
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #fc67fa,
      #f4c4f3
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    .left {
      color: #fff;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-items: center;
      h1 {
        font-size: 2.5vw;
      }
      p {
        font-size: 1vw;
        opacity: 0.8;
      }
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50vw;
      .bgc-img {
        width: 70%;
        user-select: none;
        pointer-events: none;
      }
    }
  }
</style>
