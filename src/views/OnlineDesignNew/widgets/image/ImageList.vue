<template>
  <div class="image-list-box">
    <template v-if="!widgetData?.dataSource.imgUrl">
      <!-- 上传控件 -->
      <div class="upload-widget">
        <svg-icon icon-name="icon-jiahao" color="#8e8e8e" size="16px"></svg-icon>
        <p>自定义上传</p>
      </div>
    </template>
    <template v-else>
      <div class="img-box">
        <img :src="getImgListStyleImageFile(widgetData?.dataSource.imgUrl)" alt="图片" />
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { IWidget } from '@/views/LegoDesigner/types';
  import { getImgListStyleImageFile } from './imageList';

  interface IAvatar {
    widgetData: IWidget | null; // 模块数据
  }
  withDefaults(defineProps<IAvatar>(), {
    widgetData: null
  });
</script>
<style lang="scss" scoped>
  .image-list-box {
    .upload-widget {
      width: 100px;
      height: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid #e6e6e6;
      border-radius: 2px;
      p {
        color: #8e8e8e;
        font-size: 12px;
      }
    }
    .img-box {
      max-width: 135px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
