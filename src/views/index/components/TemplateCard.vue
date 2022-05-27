<template>
  <div class="template-card-box" @mouseover="mouseover" @mouseleave="mouseleave">
    <img :src="getAssetsFile(cardData.preview)" alt="" srcset="" />
    <!-- 遮罩层 -->
    <div class="mask-layer" v-show="isShowLayer">
      <div class="preview-icon" title="预览" @click="previreImg">
        <svg-icon iconName="icon-yulan" className="yulan"></svg-icon>
      </div>
      <div class="design-button" @click="toDesign">立即免费制作</div>
    </div>
  </div>

  <PreviewImage v-show="dialogVisible" @close="close">
    <img class="previewImg" :src="getAssetsFile(cardData.preview)" alt="" srcset="" />
  </PreviewImage>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { ITempList } from '@/template/type';
  import { getAssetsFile } from '@/utils/common';
  import PreviewImage from '@/components/PreviewImage/PreviewImage.vue';
  const props = defineProps<{
    cardData: ITempList;
  }>();
  const emit = defineEmits(['toDesign']);

  // 鼠标移入显示遮罩层
  let isShowLayer = ref<boolean>(false);
  const mouseover = () => {
    isShowLayer.value = true;
  };
  const mouseleave = () => {
    isShowLayer.value = false;
  };

  // 点击立即制作
  const toDesign = () => {
    emit('toDesign', props.cardData);
  };

  // 图片预览
  const dialogVisible = ref<boolean>(false);
  const previreImg = () => {
    dialogVisible.value = true;
  };
  const close = () => {
    dialogVisible.value = false;
  };
</script>
<style lang="less" scoped>
  .template-card-box {
    width: 260px;
    height: 365px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    z-index: 0;
    user-select: none;
    margin: 0 20px;
    overflow: hidden;
    transition: all 0.3s;
    &:hover {
      transition: all 0.1s;
      box-shadow: 5px 5px 5px 0px rgba(175, 50, 50, 0.2);
    }
    img {
      width: 100%;
    }
    .mask-layer {
      height: 100%;
      width: 100%;
      border-radius: 5px;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      transition: all 0.3s;
      .design-button {
        width: 100px;
        height: 30px;
        font-size: 13px;
        background-color: #2cbd99;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        transition: all 0.3s;
        &:hover {
          background-color: rgba(#42aa90, 0.7);
        }
      }
      .preview-icon {
        position: absolute;
        right: 15px;
        top: 15px;
        z-index: 12;
        width: 30px;
        height: 30px;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        .yulan {
          cursor: pointer;
          font-size: 20px;
        }
      }
    }
  }
  .previewImg {
    height: 90vh;
  }
</style>
