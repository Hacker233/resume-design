<template>
  <div class="card-wraper" @mouseover="mouseover" @mouseleave="mouseleave">
    <div class="template-card-box">
      <img
        :src="cardData.template_cover"
        :alt="cardData.template_title"
        :title="cardData.template_title"
      />
      <!-- 遮罩层 -->
      <div
        ref="maskLayerRef"
        :class="['mask-layer', { 'card-selectd-mask': selectTemplateId === cardData._id }]"
      >
        <div class="preview-icon" title="预览" @click="previreImg">
          <svg-icon icon-name="icon-yulan" class-name="yulan" color="#fff"></svg-icon>
        </div>
        <div v-if="selectTemplateId === cardData._id" class="design-button" @click="cancleSelect"
          >取消选择</div
        >
        <div v-else class="design-button" @click="toDesign">选择模版</div>
      </div>
    </div>
    <!-- 使用人数 -->
    <div class="viewer-box">
      <!-- 模板作者 -->
      <div class="create-user">
        <span class="name" :title="cardData.template_title">{{ cardData.template_title }}</span>
      </div>
      <div class="icon-box">
        <svg-icon
          v-config:open_comment
          icon-name="icon-pinglun1"
          color="#a3abb1"
          size="19px"
        ></svg-icon>
        <svg-icon icon-name="icon-jibenziliao" color="#a3abb1" size="16px"></svg-icon>
        <span class="number">{{ cardData.template_views }}</span>
      </div>
    </div>
  </div>

  <PreviewImage v-show="dialogVisible" @close="close">
    <img class="previewImg" :src="cardData.template_cover" alt="" srcset="" />
  </PreviewImage>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import PreviewImage from '@/components/PreviewImage/PreviewImage.vue';
  const props = defineProps<{
    cardData: any;
    selectTemplateId: string; // 模版id
  }>();

  const emit = defineEmits(['toDesign', 'cancleSelect']);
  const maskLayerRef = ref<any>(null);

  // 鼠标移入显示遮罩层
  const mouseover = () => {
    maskLayerRef.value.style.opacity = 1;
  };
  const mouseleave = () => {
    if (props.selectTemplateId === props.cardData._id) {
      maskLayerRef.value.style.opacity = 1;
      return;
    }
    maskLayerRef.value.style.opacity = 0;
  };

  // 虚选择模版
  const toDesign = () => {
    emit('toDesign', props.cardData._id);
  };

  // 取消选择模版
  const cancleSelect = () => {
    emit('cancleSelect');
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
    width: 215px;
    height: 320px;
    flex-basis: fit-content;
    transition: all 0.3s;
    &:hover {
      box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 24%);
      transform: translateY(2%) scale(1.03);
      background-color: #fff;
      .viewer-box {
        color: #949ba0;
        transform: translateY(0%) scale(1);
      }
      .template-card-box {
        border-radius: 5px 5px 0 0;
      }
    }
    .template-card-box {
      height: 295px;
      background-color: #fff;
      position: relative;
      z-index: 0;
      user-select: none;
      transition: all 0.3s;
      border-radius: 5px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
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
            background-color: rgba(#42aa90, 0.9);
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
      .card-selectd-mask {
        opacity: 1 !important;
      }
    }
    .viewer-box {
      flex: 1;
      width: 100%;
      color: #a3abb1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5px;
      .create-user {
        display: flex;
        align-items: center;
        .name {
          max-width: 130px; /* 或其他合适的值 */
          margin-left: 0;
          font-size: 11px;
          color: #46505a;
          flex: 1;
          /* 添加以下属性实现省略号效果 */
          white-space: nowrap; /* 禁止换行 */
          overflow: hidden; /* 隐藏超出部分 */
          text-overflow: ellipsis; /* 显示省略号 */
        }
      }
      .icon-box {
        display: flex;
        align-items: center;
        margin-right: 5px;
        .svg-icon {
          margin-left: 10px;
        }
        .number {
          margin-left: 5px;
          font-size: 12px;
        }
      }
    }
  }

  .previewImg {
    height: 90vh;
  }
</style>
