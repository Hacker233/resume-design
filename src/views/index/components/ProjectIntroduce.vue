<template>
  <div class="project-introduce-box">
    <div class="left">
      <h1>一款开源的、免费的简历设计神器</h1>
      <p>快速设计、无后台、确保数据不会泄露，支持一键导出PDF、JSON数据。</p>
      <!-- 查看更多按钮 -->
      <div class="see-more-box">
        <div class="button" @click="freeMakeResume"> 免费制作 </div>
      </div>
    </div>
    <div class="right">
      <img class="bgc-img" src="@/assets/images/index.png" alt="" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  const emit = defineEmits(['freeMake']);
  const freeMakeResume = () => {
    emit('freeMake');
  };
</script>
<style lang="less" scoped>
  .project-introduce-box {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
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
      padding-left: 100px;
      justify-items: center;
      h1 {
        font-size: 2.5vw;
      }
      p {
        font-size: 1vw;
        opacity: 0.8;
      }
      .see-more-box {
        margin-top: 40px;
        .button {
          width: 120px;
          height: 38px;
          line-height: 38px;
          text-align: center;
          color: #fff;
          font-size: 14px;
          background-image: -webkit-linear-gradient(to right, #2ddd9d, #1cc7cf);
          background-image: -moz-linear-gradient(to right, #2ddd9d, #1cc7cf);
          background-image: -ms-linear-gradient(to right, #2ddd9d, #1cc7cf);
          background-image: linear-gradient(to right, #2ddd9d, #1cc7cf);
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          border-radius: 50px;
          background-color: #2ddd9d;
          -webkit-transition: all 0.3s;
          -moz-transition: all 0.3s;
          -ms-transition: all 0.3s;
          -o-transition: all 0.3s;
          transition: all 0.3s;
          cursor: pointer;
          user-select: none;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50vw;
      user-select: none;
      .bgc-img {
        width: 70%;
        user-select: none;
        pointer-events: none;
      }
    }
  }
</style>
