<template>
  <div class="person-box">
    <!-- 头部背景 -->
    <div class="bgc-img">
      <img src="../../assets/images/person-bgc.png" alt="" srcset="">
    </div>
    <!-- 个人菜单卡片 -->
    <left-card-vue></left-card-vue>

    <!-- 右侧路由区域 -->
    <right-content-vue></right-content-vue>
  </div>
</template>
<script lang="ts" setup>
  import LeftCardVue from './components/LeftCard.vue';
  import RightContentVue from './components/RightContent.vue';
</script>
<style lang="scss" scoped>
  .person-box {
    width: 1250px;
    min-height: 300px;
    margin: 0px auto;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 5%);
    background-color: #fff;
    border-radius: 0 0 5px 5px;
    position: relative;
    z-index: 0;
    padding: 50px 50px;
    box-sizing: border-box;
    display: flex;
    .bgc-img {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      img {
        width: 100%;
        height: 280px;
      }
    }
  }
</style>