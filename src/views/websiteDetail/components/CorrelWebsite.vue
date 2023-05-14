<template>
  <div class="correl-website-box">
    <div class="title">
      <svg-icon
        icon-name="icon-biaodanbiaoqian"
        class-name="icon"
        color="#282a2d"
        size="18px"
      ></svg-icon>
      <h3>相关网站</h3>
    </div>
    <div class="websote-card-wrap">
      <!--网站卡片 -->
      <div v-for="(cardData, index) in websiteList" :key="index" class="card-item">
        <website-card :card-data="cardData"></website-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import WebsiteCard from '@/views/websiteShare/components/WebsiteCard.vue';
  defineProps<{
    websiteList: any;
  }>();
</script>
<style lang="scss" scoped>
  .correl-website-box {
    width: 100%;
    background-color: #fff;
    border-radius: 6px;
    padding: 0 15px 0 15px;
    margin-top: 30px;
    .title {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      color: #282a2d;
      .icon {
        margin-right: 10px;
      }
      h3 {
        font-size: 16px;
        letter-spacing: 2px;
      }
    }
    .websote-card-wrap {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 10px 0;
      .card-item {
        &:not(:nth-child(4n)) {
          margin-right: 10px;
        }
      }
    }
  }
</style>
