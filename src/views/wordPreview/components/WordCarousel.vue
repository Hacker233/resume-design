<template>
  <div class="word-carousel-box">
    <h1 class="title">详情</h1>
    <el-carousel :interval="4000" height="930px">
      <el-carousel-item v-for="(item, index) in previewUrlList" :key="index">
        <div class="img-box">
          <el-image style="width: 100%; height: 100%" :src="item.url" fit />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script lang="ts" setup>
  defineProps<{
    previewUrlList: Array<any>;
  }>();
</script>
<style lang="scss" scoped>
  .word-carousel-box {
    width: 100%;
    flex: 1;
    .title {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      font-size: 22px;
      margin-bottom: 20px;
      border-bottom: 1px solid #eee;
    }
    .img-box {
      width: 700px;
      height: 900px;
      box-shadow: 2px 2px 20px rgba(119, 119, 119, 0.5);
    }
  }
  .el-carousel__item {
    display: flex;
    justify-content: center;
  }
</style>
