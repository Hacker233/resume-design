<template>
  <div class="content-title-box">
    <h1>{{ title }}</h1>
  </div>
</template>
<script lang="ts" setup>
  interface TTitle {
    title: string;
  }
  withDefaults(defineProps<TTitle>(), {
    title: ''
  });
</script>
<style lang="scss" scpoed>
  .content-title-box {
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    h1 {
      font-size: 22px;
      height: 40px;
    }
  }
</style>
