<template>
  <div class="card-wraper" @mouseover="mouseover" @mouseleave="mouseleave">
    <div class="template-card-box">
      <img class="bgc-img" :src="cardData.pan_source_cover" alt="" srcset="" />
      <!-- 价格 -->
      <div class="price-box">
        <span>{{ cardData.pan_source_price }}</span>
        <img
          width="22"
          src="@/assets/images/jianB.png"
          alt="简币"
          title="简币 - 您的专属虚拟货币"
        />
      </div>
      <!-- 遮罩层 -->
      <div ref="maskLayerRef" class="mask-layer">
        <div
          v-if="cardData.NAME !== 'custom'"
          class="preview-icon"
          title="预览"
          @click="previreImg"
        >
          <svg-icon icon-name="icon-yulan" class-name="yulan" color="#fff"></svg-icon>
        </div>
        <div class="design-button" @click="toDesign">立即获取</div>
      </div>
    </div>
    <!-- 使用人数 -->
    <div class="viewer-box">
      <!-- 模板作者 -->
      <div class="downloads-box">
        <svg-icon icon-name="icon-xiazailiang" color="#a3abb1" size="19px"></svg-icon>
        <span class="downloads">{{ cardData.downloads }}</span>
      </div>
      <div class="word-name">
        <span :title="cardData.pan_source_title">{{ cardData.pan_source_title }}</span>
      </div>
      <div class="icon-box">
        <svg-icon
          v-config:open_comment
          icon-name="icon-pinglun1"
          color="#a3abb1"
          size="19px"
        ></svg-icon>
        <span v-config:open_comment class="number">{{ cardData.commentCount }}</span>
        <svg-icon icon-name="icon-liulanliang1" color="#a3abb1" size="19px"></svg-icon>
        <span class="number">{{ cardData.pan_source_views }}</span>
      </div>
    </div>
  </div>

  <PreviewImage v-show="dialogVisible" @close="close">
    <img class="previewImg" :src="cardData.pan_source_cover" alt="" srcset="" />
  </PreviewImage>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import PreviewImage from '@/components/PreviewImage/PreviewImage.vue';
  const props = defineProps<{
    cardData: any;
  }>();
  const emit = defineEmits(['toPreview']);
  const maskLayerRef = ref<any>(null);
  // 鼠标移入显示遮罩层
  const mouseover = () => {
    maskLayerRef.value.style.opacity = 1;
  };
  const mouseleave = () => {
    maskLayerRef.value.style.opacity = 0;
  };

  // 点击立即下载
  const toDesign = () => {
    emit('toPreview', props.cardData);
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
<style lang="scss" scoped>
  .card-wraper {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    border-radius: 5px;
    overflow: hidden;
    width: 300px;
    height: 400px;
    flex-basis: fit-content;
    transition: all 0.3s;
    border: 1px solid #ebebeb;
    &:hover {
      box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 24%);
      transform: translateY(2%) scale(1.03);
      background-color: #fff;
    }
    .template-card-box {
      height: 360px;
      background-color: #fff;
      position: relative;
      z-index: 0;
      user-select: none;
      transition: all 0.3s;

      .bgc-img {
        width: 100%;
        height: 100%;
      }
      .price-box {
        display: flex;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #83ffd1;
        padding: 3px 8px;
        border-radius: 0 0 5px 0;
        z-index: 100;
        span {
          font-size: 14px;
          color: #617745;
          margin-right: 2px;
        }
        img {
          margin-left: 2px;
        }
      }
      .mask-layer {
        height: 100%;
        width: 100%;
        border-radius: 5px 5px 0 0;
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
        opacity: 0;
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
    .viewer-box {
      height: 45px;
      width: 100%;
      color: #a3abb1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5px;
      .downloads-box {
        display: flex;
        align-items: center;
        .name {
          margin-left: 10px;
          font-size: 12px;
        }
        .downloads {
          margin-left: 6px;
        }
      }
      .word-name {
        flex: 1;
        padding: 0 0 0 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        span {
          font-size: 14px;
        }
      }
      .icon-box {
        margin-right: 5px;
        display: flex;
        align-items: center;
        .svg-icon {
          margin-left: 10px;
        }
        .number {
          margin-left: 5px;
          padding-top: 1px;
        }
      }
    }
  }

  .previewImg {
    height: 90vh;
  }
</style>
