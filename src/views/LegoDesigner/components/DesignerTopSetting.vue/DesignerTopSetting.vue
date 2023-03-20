<template>
  <div class="designer-setting-box">
    <!-- 撤销和恢复 -->
    <div class="left">
      <div class="icon-box">
        <svg-icon
          icon-name="icon-shujuhuifu"
          class-name="undo"
          color="#aeaeae"
          size="22px"
        ></svg-icon>
        <span>撤销</span>
      </div>
      <div class="icon-box">
        <svg-icon icon-name="icon-shujuhuifu" color="#aeaeae" size="22px"></svg-icon>
        <span>还原</span>
      </div>
    </div>
    <!-- 缩放画布 -->
    <div class="right">
      <div class="icon-box" @click="reduce">
        <svg-icon icon-name="icon-suoxiao" color="#aeaeae" size="22px"></svg-icon>
      </div>
      <span>{{ number }}%</span>
      <div class="icon-box" @click="add">
        <svg-icon icon-name="icon-fangda" color="#aeaeae" size="22px"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';

  const number = ref<number>(100);
  const emit = defineEmits(['addSize', 'reduceSize']);
  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);

  onMounted(() => {
    window.addEventListener('mousedown', handleMousedown);
    window.addEventListener('mouseup', handleMouseup);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('mousedown', handleMousedown);
    document.removeEventListener('mouseup', handleMouseup);
  });

  // 鼠标按下事件
  const handleMousedown = () => {
    console.log('鼠标按下');
  };
  // 鼠标松开
  const handleMouseup = () => {
    console.log('鼠标松开');
  };

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

  // 监听JSON数据变化，实现撤销恢复功能
  watch(
    () => HJSchemaJsonStore.value,
    () => {
      pushItem();
    },
    {
      deep: true
    }
  );

  const pushItem = () => {
    console.log('123');
  };
</script>
<style lang="scss" scoped>
  .designer-setting-box {
    width: 100%;
    height: 50px;
    background-color: #fff;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 9;
    margin-bottom: 30px;
    z-index: 1001;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    .left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 70px;

      .icon-box {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-evenly;
        cursor: pointer;
        user-select: none;
        span {
          font-size: 12px;
          color: #aeaeae;
        }
        .undo {
          transform: rotateY(180deg);
        }
      }
    }
    .right {
      width: 120px;
      justify-content: space-between;
      display: flex;
      color: #8a8a8a;
      align-items: center;
      font-size: 14px;
      user-select: none;
      .icon-box {
        height: 30px;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba($color: #ccc, $alpha: 0);
        transition: all 0.3s;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          background-color: rgba($color: #ccc, $alpha: 0.2);
        }
      }
    }
  }
</style>
