<template>
  <div class="template-card-box" @mouseover="mouseover" @mouseleave="mouseleave">
    <img :src="cardData.previewUrl" alt="" srcset="" />
    <!-- 遮罩层 -->
    <div v-show="isShowLayer" class="mask-layer">
      <el-tooltip class="box-item" effect="dark" content="设置">
        <div class="delete-box" @click="settingOnlineResume">
          <svg-icon icon-name="icon-shezhi" color="#fff" size="20px"></svg-icon>
        </div>
      </el-tooltip>
      <div class="design-button" @click="toOnlinePreview">立即查看</div>
    </div>
  </div>

  <!-- 设置弹窗 -->
  <online-setting-dialog
    :dialog-online-visible="dialogOnlineVisible"
    :row="cardData"
    @cancle="cancleSettingDialog"
    @update-success="updateSuccess"
  ></online-setting-dialog>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { ITempList } from '@/template/type';
  import 'element-plus/es/components/message-box/style/index';
  import OnlineSettingDialog from './OnlineSettingDialog.vue';
  const props = defineProps<{
    cardData: ITempList;
  }>();
  const emit = defineEmits(['updateSuccess']);

  // 鼠标移入显示遮罩层
  let isShowLayer = ref<boolean>(false);
  const mouseover = () => {
    isShowLayer.value = true;
  };
  const mouseleave = () => {
    isShowLayer.value = false;
  };

  // 点击查看
  const onlineUrl = ref<string>(`/online/${props.cardData.ONLINE_LINK}`);
  const toOnlinePreview = () => {
    window.open(onlineUrl.value, '_blank');
  };

  // 点击删除简历
  const dialogOnlineVisible = ref<boolean>(false);
  const settingOnlineResume = async () => {
    dialogOnlineVisible.value = true;
  };

  // 取消设置
  const cancleSettingDialog = () => {
    dialogOnlineVisible.value = false;
  };

  // 更新成功
  const updateSuccess = () => {
    dialogOnlineVisible.value = false;
    emit('updateSuccess');
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
