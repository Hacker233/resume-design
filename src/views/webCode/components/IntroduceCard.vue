<template>
  <div class="introduce-card-box">
    <!-- 图标 -->
    <div class="icon-box">
      <svg-icon
        :icon-name="cardData.iconfont"
        class-name="icon-card"
        color="#2ddd9d"
        size="80px"
      ></svg-icon>
    </div>
    <!-- 标题 -->
    <div class="title-box">
      <h1>{{ cardData.title }}</h1>
    </div>
    <!-- 简介 -->
    <div class="introduce-box">
      <p>{{ cardData.introduce }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
  interface TCard {
    cardData: {
      iconfont: string;
      title: string;
      introduce: string;
    };
  }
  withDefaults(defineProps<TCard>(), {
    cardData: () => {
      return {
        iconfont: '',
        title: '',
        introduce: ''
      };
    }
  });
</script>
<style lang="scss" scoped>
  .introduce-card-box {
    width: 300px;
    height: 340px;
    box-shadow: 5px 5px 20px rgba(203, 205, 211, 0.5);
    background-color: #fff;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    transition: all 00.3s;
    &:hover {
      box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 14%);
    }
    .icon-box {
      height: 60%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .title-box {
      height: 15%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      h1 {
        font-size: 22px;
        color: #333;
      }
    }
    .introduce-box {
      padding: 0 15px;
      flex: 1;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      p {
        font-size: 14px;
        line-height: 1.5;
        letter-spacing: 1px;
        text-align: justify;
        color: rgb(126, 126, 126);
      }
    }
  }
</style>
