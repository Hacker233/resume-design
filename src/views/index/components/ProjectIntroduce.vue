<template>
  <div class="project-introduce-box" @mouseover="handleMouseover">
    <div class="left">
      <h1>一款开源的、免费的简历设计神器</h1>
      <p>快速设计、简历主题切换，支持一键导出高清PDF、JSON数据等。</p>

      <!-- 查看更多按钮 -->
      <div class="see-more-box">
        <div class="button" @click="freeMakeResume"> 免费制作 </div>
        <div class="button" @click="toCustom"> 贡献模板 </div>
        <div class="button" @click="toSponsor"> 成为赞助者 </div>
      </div>
    </div>
    <div class="right">
      <img class="bgc-img" src="@/assets/images/index.png" alt="" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { closeGlobalLoading } from '@/utils/common';

  const emit = defineEmits(['freeMake', 'customTemplate', 'sponsor']);
  const freeMakeResume = () => {
    emit('freeMake');
  };
  const handleMouseover = () => {
    // console.log('鼠标移动');
  };
  // 成为赞助者
  const toSponsor = () => {
    emit('sponsor');
  };

  // 滚动到自定义模板
  const toCustom = () => {
    emit('customTemplate');
  };

  // 页面销毁
  onUnmounted(() => {
    closeGlobalLoading(); // 关闭全局等待层
  });
</script>
<style lang="scss" scoped>
  .project-introduce-box {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    background: #3494e6; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #ec6ead,
      #3494e6
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #ec6ead,
      #3494e6
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
        margin-bottom: 20px;
      }
      p {
        font-size: 1vw;
        opacity: 0.8;
      }
      .see-more-box {
        margin-top: 40px;
        display: flex;
        .button {
          width: 120px;
          height: 38px;
          margin-right: 20px;
          line-height: 38px;
          text-align: center;
          letter-spacing: 2px;
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
