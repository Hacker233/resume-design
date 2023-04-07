<template>
  <div class="card-wraper" @mouseover="mouseover" @mouseleave="mouseleave">
    <div class="template-card-box">
      <img :src="cardData.previewUrl" alt="" srcset="" />
      <!-- 遮罩层 -->
      <div ref="maskLayerRef" class="mask-layer">
        <div class="delete-box" @click="deleteUserResume">
          <svg-icon icon-name="icon-shanchu" color="#fff" size="20px"></svg-icon>
        </div>
        <div class="design-button" @click="toDesign">继续制作</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  interface ICard {
    cardData: any;
    width: string;
    height: string;
  }
  const props = withDefaults(defineProps<ICard>(), {
    cardData: null,
    width: '300px',
    height: '400px'
  });

  const emit = defineEmits(['toDesign', 'deletePersonTemplate']);
  const maskLayerRef = ref<any>(null);
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

  // 点击删除简历
  const deleteUserResume = async () => {
    ElMessageBox.confirm('删除该创作后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        emit('deletePersonTemplate', props.cardData._id);
      })
      .catch(() => {});
  };
</script>
<style lang="scss" scoped>
  .card-wraper {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    border-radius: 5px;
    overflow: hidden;
    width: v-bind('props.width');
    height: v-bind('props.height');
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
    }
    .template-card-box {
      height: v-bind('props.height');
      background-color: #fff;
      position: relative;
      z-index: 0;
      user-select: none;
      transition: all 0.3s;
      .how-much-box {
        width: 50px;
        height: 25px;
        border-radius: 0 4px 4px 0;
        position: absolute;
        top: -1px;
        left: -1px;
        background-image: linear-gradient(to right, #a6db14, #1cc7cf);
        background-color: #a6db14;
        z-index: 99;
        .free {
          color: #fff;
          font-size: 12px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 2px;
        }
        .pay {
          color: #fff;
          font-size: 12px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 2px;
          img {
            width: 14px;
            height: 14px;
            margin-left: 2px;
          }
        }
      }

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
        .delete-box {
          position: absolute;
          top: 5px;
          right: 5px;
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          background-color: #2cbd99;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            background-color: rgba(#42aa90, 0.7);
          }
        }
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
      }
    }
  }
</style>
