<template>
  <div class="img-compress-box">
    <!-- 图片压缩规格选择 -->
    <div class="img-compress-size-box">
      <size-compress></size-compress>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import SizeCompress from './components/SizeCompress.vue';
</script>
<style lang="scss" scoped>
  .img-compress-box {
    width: 1300px;
    margin: 0 auto;
    min-height: 300px;
    .img-compress-size-box {
      margin: 30px 0;
      padding: 30px 20px;
      border-radius: 10px;
      width: 100%;
      background-color: #fff;
    }
  }
</style>
