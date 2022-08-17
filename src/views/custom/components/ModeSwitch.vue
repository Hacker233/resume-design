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
        :class="['classical-icon-box', { active: currentChoose === 'classical' }]"
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
        :class="['left-right-box', { active: currentChoose === 'leftRight' }]"
        @click="chooseLeftRight"
      >
        <svg-icon icon-name="icon-buju-04" color="#74a274" size="17px"></svg-icon>
      </div>
    </el-tooltip>
  </div>
</template>
<script lang="ts" setup>
  // 目前选中的模板
  const currentChoose = ref<string>('classical');

  // 选择左右布局样式
  const chooseLeftRight = () => {
    currentChoose.value = 'leftRight';
  };

  // 选择传统布局方式
  const chooseClassical = () => {
    currentChoose.value = 'classical';
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
