<template>
  <div class="preview-box">
    <slot></slot>
    <!-- 关闭按钮 -->
    <div class="close" @click="close">
      <el-icon color="#fff"><CloseBold /></el-icon>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const emit = defineEmits(['close']);
  const close = () => {
    emit('close');
  };
</script>
<style lang="less" scoped>
  .preview-box {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 90;
    .close {
      position: absolute;
      width: 40px;
      height: 40px;
      background-color: #000;
      right: 50px;
      top: 50px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
</style>
