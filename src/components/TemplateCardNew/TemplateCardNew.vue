<template>
  <div class="card-wraper" @mouseover="mouseover" @mouseleave="mouseleave">
    <div class="template-card-box">
      <img
        :src="cardData.template_cover"
        :alt="cardData.template_title || '模版预览'"
        :title="cardData.template_title"
      />
      <!-- 遮罩层 -->
      <div ref="maskLayerRef" class="mask-layer">
        <div class="preview-icon" title="预览" @click="previreImg">
          <svg-icon icon-name="icon-yulan" class-name="yulan"></svg-icon>
        </div>
        <div class="design-button" @click="toDesign">立即免费制作</div>
      </div>
    </div>
    <!-- 使用人数 -->
    <div class="viewer-box">
      <!-- 模板作者 -->
      <div class="create-user">
        <el-tooltip :content="cardData.template_title" placement="top" :disabled="!isTitleOverflow">
          <span ref="nameRef" class="name">{{ cardData.template_title }}</span>
        </el-tooltip>
      </div>
      <div class="icon-box">
        <svg-icon
          v-config:open_comment
          icon-name="icon-pinglun1"
          color="#a3abb1"
          size="19px"
        ></svg-icon>
        <svg-icon icon-name="icon-jibenziliao" color="#a3abb1" size="19px"></svg-icon>
        <span class="number">{{ formatViews(cardData.template_views) }}</span>
      </div>
    </div>
  </div>

  <PreviewImage v-show="dialogVisible" @close="close">
    <img class="previewImg" :src="cardData.template_cover" alt="" srcset="" />
  </PreviewImage>
</template>
<script setup lang="ts">
  import { ref, nextTick, watch, onMounted } from 'vue';
  import PreviewImage from '@/components/PreviewImage/PreviewImage.vue';
  const props = defineProps<{
    cardData: any;
  }>();

  const emit = defineEmits(['toDesign']);
  const maskLayerRef = ref<any>(null);
  const nameRef = ref<HTMLElement | null>(null);
  const isTitleOverflow = ref(false);

  // 检测标题是否溢出
  const checkTitleOverflow = () => {
    nextTick(() => {
      if (nameRef.value) {
        isTitleOverflow.value = nameRef.value.scrollWidth > nameRef.value.clientWidth;
      }
    });
  };

  // 监听cardData变化，重新检测溢出
  watch(
    () => props.cardData.template_title,
    () => {
      checkTitleOverflow();
    }
  );

  // 组件挂载时检测溢出
  onMounted(() => {
    checkTitleOverflow();
  });

  // 格式化使用人数显示
  function formatViews(views) {
    if (views >= 100000000) {
      return (views / 100000000).toFixed(1) + '亿+';
    } else if (views >= 10000000) {
      return (views / 10000000).toFixed(1) + '千+';
    } else if (views >= 10000) {
      return (views / 10000).toFixed(1) + '万+';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + '千+';
    } else if (views > 0) {
      return views + '人使用';
    } else {
      return '暂无使用数据';
    }
  }

  // 鼠标移入显示遮罩层
  const mouseover = () => {
    maskLayerRef.value.style.opacity = 1;
  };
  const mouseleave = () => {
    maskLayerRef.value.style.opacity = 0;
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
<style lang="scss" scoped>
  .card-wraper {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    border-radius: 8px;
    overflow: hidden;
    width: 300px;
    height: 440px;
    flex-basis: fit-content;
    transition: all 0.3s ease;
    position: relative;
    background: #fff;
    border: 1px solid #e8e8e8;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 8px;
      padding: 1px;
      background: linear-gradient(135deg, rgba(86, 204, 242, 0.4) 0%, rgba(47, 128, 237, 0.4) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      box-shadow: 0 8px 24px rgba(64, 150, 255, 0.2);
      transform: translateY(-4px);

      &::before {
        opacity: 1;
      }

      .viewer-box {
        color: #6b7280;
      }

      .template-card-box {
        border-radius: 8px 8px 0 0;
      }
    }

    .template-card-box {
      height: 400px;
      background-color: #fff;
      position: relative;
      z-index: 0;
      user-select: none;
      transition: all 0.3s ease;
      border-radius: 8px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }

      .mask-layer {
        height: 100%;
        width: 100%;
        border-radius: 8px 8px 0 0;
        position: absolute;
        left: 0;
        top: 0;
        background: linear-gradient(
          180deg,
          rgba(86, 204, 242, 0.08) 0%,
          rgba(47, 128, 237, 0.12) 100%
        );
        backdrop-filter: blur(2px);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        opacity: 0;

        .design-button {
          width: 110px;
          height: 36px;
          font-size: 13px;
          font-weight: 500;
          background: linear-gradient(145deg, #56ccf2, #2f80ed);
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(47, 128, 237, 0.3);

          &:hover {
            box-shadow: 0 6px 16px rgba(47, 128, 237, 0.4);
            transform: translateY(-2px);
          }
        }

        .preview-icon {
          position: absolute;
          right: 12px;
          top: 12px;
          z-index: 12;
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.98);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          border: 1px solid rgba(47, 128, 237, 0.2);

          &:hover {
            box-shadow: 0 6px 16px rgba(47, 128, 237, 0.4);
            transform: scale(1.08);
            border-color: rgba(47, 128, 237, 0.5);
          }

          .yulan {
            cursor: pointer;
            font-size: 20px;
            color: #2f80ed;
          }
        }
      }
    }

    .viewer-box {
      flex: 1;
      width: 100%;
      color: #9ca3af;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      background: #fff;
      border-top: 1px solid #f3f4f6;

      .create-user {
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 0;

        .name {
          margin-left: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
        }
      }

      .icon-box {
        display: flex;
        align-items: center;
        margin-right: 4px;

        .svg-icon {
          margin-left: 8px;
          transition: all 0.3s ease;
          color: #9ca3af;

          &:hover {
            color: #2f80ed;
          }
        }

        .number {
          margin-left: 4px;
          font-size: 12px;
          font-weight: 500;
          color: #2f80ed;
        }
      }
    }
  }

  .previewImg {
    height: 90vh;
  }
</style>
