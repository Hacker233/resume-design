<template>
  <div class="website-screen-card-box">
    <div class="title">
      <svg-icon
        icon-name="icon-beijingshuju"
        class-name="icon"
        color="#282a2d"
        size="18px"
      ></svg-icon>
      <h3>网站快照</h3>
    </div>
    <div v-viewer class="img-box">
      <img :src="websiteInfo.website_screen" alt="" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  defineProps<{
    websiteInfo: any;
  }>();
</script>
<style lang="scss" scoped>
  .website-screen-card-box {
    width: 100%;
    background-color: #fff;
    border-radius: 6px;
    padding: 0 20px 0 20px;
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
    .img-box {
      width: 100%;
      padding: 20px 0;
      display: flex;
      align-items: center;
      height: center;
      img {
        max-width: 100%;
        border-radius: 6px;
      }
    }
  }
</style>
