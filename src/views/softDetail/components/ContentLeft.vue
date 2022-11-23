<template>
  <div class="content-left-box">
    <!-- 简介 -->
    <div class="introduce-box">
      <com-title title="简介"></com-title>
      <div v-dompurify-html="content.source_abstract" class="content"></div>
    </div>
    <!-- 预览图 -->
    <div class="preview-img-box">
      <com-title title="预览图"></com-title>
      <div class="img-list">
        <img
          v-for="(item, index) in content.source_screen"
          :key="index"
          :src="item.response.data.fileUrl"
          :alt="item.source_title"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import ComTitle from './ComTitle.vue';
  defineProps<{
    content: any;
  }>();
</script>
<style lang="scss" scoped>
  .content-left-box {
    width: 850px;
    min-height: 300px;
    .introduce-box {
      background-color: #fff;
      border-radius: 10px;
      padding: 0 20px 20px 20px;
      margin-bottom: 30px;
      .content {
        padding: 30px 0;
        letter-spacing: 1px;
        font-size: 16px;
        color: #333;
        line-height: 1.5;
      }
    }
    .preview-img-box {
      background-color: #fff;
      border-radius: 10px;
      padding: 0 20px 20px 20px;
      .img-list {
        padding: 30px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 80%;
          box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 6%);
          margin-bottom: 15px;
          border-radius: 10px;
        }
      }
    }
  }
</style>
