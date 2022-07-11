<template>
  <div class="title">
    <h1>{{ title }}</h1>
  </div>
</template>
<script setup lang="ts">
  interface ITitle {
    title?: string;
  }
  withDefaults(defineProps<ITitle>(), {
    title: '模块选择'
  });
</script>
<style lang="less" scoped>
  .title {
    height: 60px;
    width: 100%;
    display: flex;
    background-color: #fff;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 0 12px;
    box-sizing: border-box;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 8%);
    &::after {
      content: '';
      width: 100%;
      height: 1px;
      background-color: #eee;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
    }

    h1 {
      font-size: 14px;
      color: #333333;
      font-weight: bold;
      letter-spacing: 3px;
    }
  }
</style>
