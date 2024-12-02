<template>
  <div class="template-card-box" @mouseover="mouseover" @mouseleave="mouseleave">
    <img :src="type === 'old' ? cardData.previewUrl : cardData.template_cover" alt="" srcset="" />
    <!-- 遮罩层 -->
    <div v-show="isShowLayer" class="mask-layer">
      <div class="delete-box" @click="deleteUserResume">
        <svg-icon icon-name="icon-shanchu" color="#fff" size="20px"></svg-icon>
      </div>
      <div class="design-button" @click="toDesign">继续制作</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import { openGlobalLoading } from '@/utils/common';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';

  const props = defineProps<{
    cardData: any;
    type: string;
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

  // 点击继续制作
  const { resetResumeJson } = appStore.useCreateTemplateStore;
  const { selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);
  const router = useRouter();
  const toDesign = () => {
    console.log(props.cardData);
    if (props.type === 'old') {
      router.push({
        path: '/designer',
        query: {
          id: props.cardData.ID
        }
      });
    } else {
      openGlobalLoading(); // 等待动画层
      resetResumeJson(); // 重置json数据
      selectedModuleId.value = ''; // 重置选中模块
      router.push({
        path: `/designResume/${props.cardData.template_id}`
      });
    }
  };

  // 点击删除简历
  const deleteUserResume = async () => {
    ElMessageBox.confirm('删除该简历后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        if (props.type === 'old') {
          emit('delete', props.cardData.ID);
        } else {
          emit('delete', props.cardData._id);
        }
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
