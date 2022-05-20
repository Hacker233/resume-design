<template>
  <div class="template-card-box" @mouseover="mouseover" @mouseleave="mouseleave">
    <img :src="cardData.preview" alt="" srcset="" />
    <!-- 遮罩层 -->
    <div class="mask-layer">
      <div class="design-button" @click="toDesign">立即免费制作</div>
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
  const layerOpacity = ref<number>(0);
  const mouseover = () => {
    layerOpacity.value = 0.5;
  };
  const mouseleave = () => {
    layerOpacity.value = 0;
  };

  // 点击立即制作
  const toDesign = () => {
    emit('toDesign', props.cardData);
  };
</script>
<style lang="less" scoped>
  .template-card-box {
    width: 260px;
    height: 365px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
    user-select: none;
    margin: 0 20px;
    overflow: hidden;
    &:hover {
      transition: all 0.1s;
      box-shadow: 5px 5px 5px 0px rgba(175, 50, 50, 0.1);
    }
    .mask-layer {
      height: 100%;
      width: 100%;
      border-radius: 5px;
      position: absolute;
      left: 0;
      top: 0;
      opacity: v-bind('layerOpacity');
      background-color: #000;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      .design-button {
        width: 100px;
        height: 30px;
        font-size: 13px;
        background-color: #008563;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        transition: all 0.3s;
        &:hover {
          background-color: rgba(#008563, 0.7);
        }
      }
    }
  }
</style>
