<template>
  <div class="background-1 design">
    <div ref="customContentPdf">
      <slot></slot>
    </div>

    <!-- 背景图模块 -->
    <div class="top-line"></div>
    <div class="left-line"></div>
    <div class="bottom-line"></div>
    <div class="right-line"></div>
  </div>
</template>
<script lang="ts" setup>
  const emit = defineEmits(['contentHeightChange']);
  // 生命周期函数
  onMounted(() => {
    changeHeight();
  });
  // 监听内容高度发生变化
  const customContentPdf = ref<any>(null);
  let observer: ResizeObserver | null = null;
  let height = 0;
  const changeHeight = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        console.log('内容高度发生变化', height);
        emit('contentHeightChange');
      }
    });
    observer.observe(customContentPdf.value); // 监听元素
  };
</script>
<style lang="scss" scoped>
  .background-1 {
    background: #fff;
    .top-line {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      height: 30px;
      padding: 0;
      background: #ebebeb;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 40%;
        height: 30px;
        background: #000;
        z-index: 1;
      }
    }
    .left-line {
      width: 30px;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #000;
      z-index: 1;
    }
    .bottom-line {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      height: 30px;
      padding: 0;
      background: #ebebeb;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 40%;
        height: 30px;
        background: #000;
        z-index: 1;
      }
    }
    .right-line {
      width: 30px;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      background: #ebebeb;
      z-index: 1;
    }
  }
</style>
