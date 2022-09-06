<template>
  <div class="template-card-box" @mouseover="mouseover" @mouseleave="mouseleave">
    <img :src="cardData.previewUrl" alt="" srcset="" />
    <!-- 遮罩层 -->
    <div v-show="isShowLayer" class="mask-layer">
      <div class="design-button" @click="toDesign">继续制作</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { ITempList } from '@/template/type';
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

  // 点击继续制作
  const router = useRouter();
  const toDesign = () => {
    console.log(props.cardData)
    router.push({
      path: '/designer',
      query: {
        id: props.cardData.ID
      }
    });
  };
</script>
<style lang="scss" scoped>
  .template-card-box {
    width: 260px;
    height: 365px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    z-index: 0;
    user-select: none;
    overflow: hidden;
    transition: all 0.3s;
    margin-bottom: 30px;
    box-shadow: 5px 5px 5px 0px rgba(165, 128, 128, 0.2);
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
