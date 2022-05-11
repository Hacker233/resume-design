<template>
  <div class="title">
    <div class="left"></div>
    <div class="editor-resume">{{ resumeTitlt.title }}</div>
  </div>
</template>
<script lang="ts" setup>
  import { IRESUMETITLE } from '@/types/model';
  defineProps<{
    resumeTitlt: IRESUMETITLE;
  }>();
</script>

<style lang="less" scoped>
  .title {
    width: 100%;
    min-height: 32px;
    background-color: #000;
    margin-top: 20px;
    display: flex;
    .left {
      min-height: 32px;
      width: 36px;
      background-color: #258bb1;
      margin-right: 18px;
    }

    .editor-resume {
      color: #fff;
      outline: none;
      font-weight: 600;
      letter-spacing: 2px;
      word-break: break-all;
      width: 0;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
</style>
