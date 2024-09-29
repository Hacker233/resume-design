<template>
  <div class="page-box" :style="style"> </div>
</template>
<script setup lang="ts">
  const props = defineProps<{
    style: any;
  }>();

  const style = computed(() => {
    return {
      width: `${props.style.width}px`,
      minHeight: `${props.style.height}px`,
      background: props.style.background || '#ffffff',
      opacity: props.style.opacity,
      backgroundImage: props.style.backgroundImage || '',
      fontFamily: props.style.fontFamily || ''
    };
  });
</script>
<style lang="scss" scoped>
  .page-box {
    width: 820px;
    min-height: 1160px;
  }
</style>
