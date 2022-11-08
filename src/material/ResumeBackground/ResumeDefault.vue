<template>
  <div class="background-default design">
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
  .background-default {
    background: #fff;
  }
</style>
