<template>
  <p :style="style">{{ abstract }}</p>
</template>
<script lang="ts" setup>
  interface TP {
    abstract?: string;
    style?: any;
  }

  withDefaults(defineProps<TP>(), {
    abstract: '我是一段文字一句话简介，尽量不要太长',
    style: {}
  });
</script>
