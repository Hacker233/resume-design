<!-- 自定义模板 -->
<template>
  <div class="custom-template-box">
    <title-vue
      title="自定义模板 + 随心所欲"
      subtitle="自定义模板，随意搭配，自定义主题"
      titleColor="#fff"
      subtitleColor="#e2e3e4"
    ></title-vue>
    <div class="bottom">
      <div class="left-box">
        <img src="../../../assets/images/index-drag.png" alt="" srcset="" />
      </div>
      <div class="right-box"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import TitleVue from './Title.vue';
</script>
<style lang="scss" scoped>
  .custom-template-box {
    height: 80vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #4e54c8; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #8f94fb,
      #4e54c8
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #8f94fb,
      #4e54c8
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40px;
      box-sizing: border-box;
      height: 60vh;
      .right-box {
        flex: 1;
      }
      .left-box {
        display: flex;
        align-items: center;
        justify-content: center;
        // width: 60vw;
        user-select: none;
        img {
          width: 50vw;
        }
      }
    }
  }
</style>
