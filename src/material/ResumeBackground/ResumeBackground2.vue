<template>
  <div class="background-2 design">
    <div ref="customContentPdf"><slot></slot></div>
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
  .background-2 {
    background: url(../../assets/images/resumeBackground/bg-1.jpg) repeat-y;
    box-sizing: border-box;
    :deep(.content-box) {
      .dragArea {
        border-radius: 6px;
        box-shadow: 0 0 0 1px #ccc;
        background-color: rgba(#fff, 0.9);
        min-height: 1100px !important;
        margin: 30px;
        min-width: 760px !important;
        width: 760px !important;
      }
    }
  }
</style>
