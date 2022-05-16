<template>
  <div class="model-title">
    <h1>{{ title }}</h1>
  </div>
</template>
<script setup lang="ts">
  defineProps<{
    title: string;
  }>();
</script>
<style lang="less" scoped>
  .model-title {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid @primary-title-color;
    h1 {
      font-size: @primary-title-font-size;
      color: @primary-title-color;
      border-bottom: 3px solid @primary-title-color;
      display: flex;
      align-items: center;
      height: 100%;
      min-width: 150px;
    }
  }
</style>
