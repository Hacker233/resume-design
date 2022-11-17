<template>
  <div class="web-code-box">
    <!-- 背景图 -->
    <img class="bgc-img" src="@/assets/images/private_bgc.png" alt="" srcset="" />
    <!-- 头部标题位置 -->
    <div class="title-box">
      <h1>将91化简私有部署为你自己的网站</h1>
    </div>

    <!-- 介绍卡片 -->
    <div class="card-list-box">
      <div v-for="(item, index) in 10" :key="index" class="card-box">
        <introduce-card-vue></introduce-card-vue>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import IntroduceCardVue from './components/IntroduceCard.vue';
</script>
<style lang="scss" scoped>
  .web-code-box {
    position: relative;
    width: 1250px;
    margin: 0 auto;
    min-height: 500px;
    z-index: 0;
    .bgc-img {
      width: 100%;
      height: 330px;
      position: absolute;
      z-index: 1;
      filter: blur(3px);
    }
    .title-box {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: center;
      height: 300px;
      align-items: center;
      h1 {
        color: #fff;
        font-size: 60px;
        font-family: '站酷快乐体';
        letter-spacing: 2px;
      }
    }

    .card-list-box {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 80px 0 20px 0;
      .card-box {
        width: 33.33%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 40px;
      }
    }
  }
</style>
