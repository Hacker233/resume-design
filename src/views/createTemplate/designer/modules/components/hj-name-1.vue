<template>
  <h1 :style="style">{{ name }}</h1>
</template>
<script lang="ts" setup>
  interface TH {
    name?: string;
    style?: any;
  }

  withDefaults(defineProps<TH>(), {
    name: '化简',
    style: {}
  });
</script>
