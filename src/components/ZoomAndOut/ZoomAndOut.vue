<template>
  <div class="zoom-and-out-box">
    <div class="left" @click="reduce">-</div>
    <div class="center">{{ number }}%</div>
    <div class="right" @click="add">+</div>
  </div>
</template>
<script lang="ts" setup>
  const number = ref<number>(100);
  const emit = defineEmits(['addSize', 'reduceSize']);

  // 加
  const add = () => {
    if (number.value >= 150) {
      return;
    } else {
      number.value += 5;
      emit('addSize', number.value / 100);
    }
  };

  // 减
  const reduce = () => {
    if (number.value <= 50) {
      return;
    } else {
      number.value -= 5;
      emit('reduceSize', number.value / 100);
    }
  };
</script>
<style lang="scss" scoped>
  .zoom-and-out-box {
    display: flex;
    justify-content: space-between;
    width: 88px;
    height: 20px;
    background: #e2e4e7;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 70px;
    transform: translate(-50%, 0);
    user-select: none;
    .left,
    .right {
      width: 20px;
      height: 20px;
      cursor: pointer;
      background: #eee;
      color: #888;
      border-radius: 10px;
      border: 1px #bbb solid;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 3px;
      transition: all 0.3s;
      &:hover {
        border-color: #74a274;
        opacity: 0.9;
        color: #74a274;
      }
    }
    .left {
      margin: 1px 0 0 1px;
      font-size: 24px;
    }
    .right {
      margin: 1px 1px 0 0;
      font-size: 18px;
    }
    .center {
      width: 40px;
      border: 0;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      margin: 0 5px;
      color: #888;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
