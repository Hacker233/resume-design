<template>
  <div class="template-card-box" @mouseover="mouseover" @mouseleave="mouseleave">
    <img :src="cardData.previewUrl" alt="" srcset="" />

    <!-- 审核状态 -->
    <div class="audit-status-box">
      <!-- 已通过 -->
      <div v-if="cardData.audit_status === 1" class="pass">已通过</div>
      <!-- 审核中 -->
      <div v-else-if="cardData.audit_status === 0" class="review">审核中</div>
      <!-- 未通过 -->
      <div v-else class="refuse">未通过</div>
    </div>
    <!-- 遮罩层 -->
    <div v-show="isShowLayer" class="mask-layer">
      <div class="delete-box" @click="deleteUserResume">
        <svg-icon icon-name="icon-shanchu" color="#fff" size="20px"></svg-icon>
      </div>
      <div class="design-button" @click="toDesign">修改作品</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  const props = defineProps<{
    cardData: {
      lego_id: string;
      title: string;
      previewUrl: string;
      _id: string;
      audit_status: number;
    };
  }>();
  const emit = defineEmits(['delete']);

  // 鼠标移入显示遮罩层
  let isShowLayer = ref<boolean>(false);
  const mouseover = () => {
    isShowLayer.value = true;
  };
  const mouseleave = () => {
    isShowLayer.value = false;
  };

  // 点击修改作品
  const router = useRouter();
  const toDesign = () => {
    console.log(props.cardData);
    router.push({
      path: '/legoDesigner',
      query: {
        id: props.cardData._id,
        jsonId: props.cardData.lego_id
      }
    });
  };

  // 点击删除简历
  const deleteUserResume = async () => {
    ElMessageBox.confirm('删除该创作后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        emit('delete', props.cardData._id);
      })
      .catch(() => {});
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
    border: 1px solid #eee;
    &:hover {
      transition: all 0.1s;
      box-shadow: 5px 5px 5px 0px rgba(175, 50, 50, 0.2);
    }
    .audit-status-box {
      position: absolute;
      right: 0;
      top: 0;
      width: 60px;
      height: 20px;
      .pass,
      .review,
      .refuse {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #fff;
        border-radius: 0 5px 0 5px;
        letter-spacing: 1px;
      }
      .pass {
        background-image: linear-gradient(to right, #2ddd9d, #1cc7cf);
        background-color: #2ddd9d;
        transition: all 0.3s;
        user-select: none;
      }
      .review {
        background: green;
      }
      .refuse {
        background: red;
      }
    }
    img {
      width: 100%;
      height: 100%;
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
      z-index: 1;
      transition: all 0.3s;
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
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        &:hover {
          background-color: rgba(#42aa90, 0.7);
        }
      }
    }
  }
  .previewImg {
    height: 90vh;
  }
</style>
