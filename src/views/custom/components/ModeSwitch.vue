<template>
  <!-- 模板样式切换 -->
  <div class="mode-switch">
    <el-tooltip class="box-item" effect="light" :enterable="false" placement="left">
      <template #content>
        <div class="tip-box">
          <h1>传统布局模式</h1>
          <img src="../../../assets/images/template1.png" alt="" srcset="" />
        </div>
      </template>
      <div
        :class="['classical-icon-box', { active: resumeJsonNewStore.LAYOUT === 'classical' }]"
        @click="chooseClassical"
      >
        <svg-icon
          icon-name="icon-yemianhebujuPagesandLayout21"
          color="#74a274"
          size="17px"
        ></svg-icon>
      </div>
    </el-tooltip>
    <el-tooltip class="box-item" effect="light" :enterable="false" placement="left">
      <template #content>
        <div class="tip-box">
          <h1>左右布局模式</h1>
          <img src="../../../assets/images/template2.png" alt="" srcset="" />
        </div>
      </template>
      <div
        :class="['left-right-box', { active: resumeJsonNewStore.LAYOUT === 'leftRight' }]"
        @click="chooseLeftRight"
      >
        <svg-icon icon-name="icon-buju-04" color="#74a274" size="17px"></svg-icon>
      </div>
    </el-tooltip>

    <!-- 基本属性设置弹窗 -->
    <el-dialog
      :model-value="dialogVisible"
      width="360px"
      title="基本属性设置"
      :show-close="false"
      :close-on-click-modal="false"
      append-to-body
      custom-class="base-options"
    >
      <!-- 属性设置区域 -->
      <div class="base-options-box">
        <el-form :model="form" label-width="80px">
          <el-form-item label="左侧宽度：">
            <el-input-number
              v-model="form.leftWidth"
              :min="0"
              :max="820"
              @change="handleLeftWidth"
            />
          </el-form-item>
          <el-form-item label="左侧背景色:">
            <color-picker-custom-vue v-model="form.leftThemeColor"></color-picker-custom-vue>
          </el-form-item>
          <el-form-item label="右侧宽度：" label-width="80px">
            <el-input-number
              v-model="form.rightWidth"
              :min="0"
              :max="820"
              @change="handleRightWidth"
            />
          </el-form-item>
          <el-form-item label="右侧背景色:">
            <color-picker-custom-vue v-model="form.rightThemeColor"></color-picker-custom-vue>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancle">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import ColorPickerCustomVue from '@/components/ColorPicker/ColorPickerCustom.vue';

  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);
  // 表单数据
  const form = reactive({
    leftWidth: 270,
    rightWidth: 550,
    leftThemeColor: '#254665',
    rightThemeColor: '#fff'
  });

  // 左侧宽度改变
  const handleLeftWidth = (value: number) => {
    form.rightWidth = 820 - value;
  };

  // 右侧宽度改变
  const handleRightWidth = (value: number) => {
    form.leftWidth = 820 - value;
  };
  // 选择左右布局样式
  const chooseLeftRight = () => {
    dialogVisible.value = true;
  };

  // 选择传统布局方式
  const chooseClassical = () => {
    resumeJsonNewStore.value.LAYOUT = 'classical';
    resumeJsonNewStore.value.COMPONENTS = [];
  };

  // 属性设置弹窗
  const dialogVisible = ref<boolean>(false);

  // 弹窗确定
  const confirm = () => {
    resumeJsonNewStore.value.GLOBAL_STYLE.leftWidth = `${form.leftWidth}px`;
    resumeJsonNewStore.value.GLOBAL_STYLE.rightWidth = `${form.rightWidth}px`;
    resumeJsonNewStore.value.GLOBAL_STYLE.leftThemeColor = form.leftThemeColor;
    resumeJsonNewStore.value.GLOBAL_STYLE.rightThemeColor = form.rightThemeColor;
    resumeJsonNewStore.value.LAYOUT = 'leftRight';
    resumeJsonNewStore.value.COMPONENTS = [];
    dialogVisible.value = false;
  };

  // 弹窗取消
  const cancle = () => {
    dialogVisible.value = false;
  };
</script>
<style lang="scss" scoped>
  .mode-switch {
    height: 78px;
    width: 40px;
    position: absolute;
    top: 0;
    right: -53px;
    background: #e0e4ec;
    border-radius: 100px;
    padding: 1px;
    -webkit-box-shadow: 0 1px rgb(255 255 255 / 50%), 0 8px 13px rgb(0 0 0 / 15%) inset;
    box-shadow: 0 1px rgb(255 255 255 / 50%), 0 8px 13px rgb(0 0 0 / 15%) inset;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .classical-icon-box,
    .left-right-box {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
    }
    .active {
      background-color: #fff;
      &:hover {
        background-color: rgba(#fff, 0.7);
      }
    }
  }
  .tip-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 14px;
      margin-bottom: 10px;
    }
    img {
      width: 120px;
    }
  }
</style>
