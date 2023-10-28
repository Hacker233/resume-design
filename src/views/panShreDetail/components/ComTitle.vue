<template>
  <div class="com-title-box">
    <h1>{{ title }}</h1>
  </div>
</template>
<script lang="ts" setup>
  defineProps<{
    title: string;
  }>();
</script>
<style lang="scss" scoped>
  .com-title-box {
    width: 100%;
    border-bottom: 1px solid #ccc;
    height: 55px;
    display: flex;
    align-items: center;
    h1 {
      font-size: 20px;
    }
  }
</style>
