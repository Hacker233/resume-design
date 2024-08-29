<template>
  <div class="global-opacity-editor-box">
    <el-form-item label="背景透明度:">
      <el-input-number v-model="HJSchemaJsonStore.css.opacity" :min="0" :max="1" :step="0.1" />
      <span class="unit">0~1</span>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';

  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);
</script>
<style lang="scss" scoped>
  .global-opacity-editor-box {
    .unit {
      margin-left: 10px;
      color: #929292;
      letter-spacing: 2px;
    }
  }
</style>
