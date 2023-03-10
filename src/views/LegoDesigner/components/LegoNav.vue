<template>
  <div class="lego-nav-box">
    <el-button @click="jsonView">查看JSON</el-button>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';

  const jsonView = () => {
    const { HJSchemaJson } = appStore.useLegoJsonStore;
    console.log('HJSchemaJson', HJSchemaJson);
  };
</script>
<style lang="scss" scoped>
  .lego-nav-box {
    background-color: #fff;
    height: 60px;
    width: 100%;
  }
</style>
