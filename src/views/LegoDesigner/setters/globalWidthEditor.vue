<template>
  <div class="global-width-editor-box">
    <el-form-item label="宽度:">
      <el-input-number v-model="HJSchemaJsonStore.css.width" :min="0" />
      <span class="unit">像素</span>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';

  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);
</script>
<style lang="scss" scoped>
  .global-width-editor-box {
    .unit {
      margin-left: 10px;
      color: #929292;
      letter-spacing: 2px;
    }
  }
</style>
