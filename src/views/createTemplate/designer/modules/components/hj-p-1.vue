<template>
  <p class="hj-p" :style="style">{{ p }}</p>
</template>
<script lang="ts" setup>
  interface TP {
    p?: string;
    style?: any;
  }

  withDefaults(defineProps<TP>(), {
    p: '我是一段文字',
    style: {}
  });
</script>
<style lang="scss" scoped>
  .hj-p {
    display: flex;
    align-items: center;
  }
</style>
