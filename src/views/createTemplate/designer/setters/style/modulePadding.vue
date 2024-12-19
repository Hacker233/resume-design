<template>
  <div class="margin-editor-box">
    <el-form-item label="模块内边距">
      <div class="padding-setting-box">
        <div class="left">
          <el-input-number
            v-model="HJNewJsonStore.css.modulePadding.left"
            controls-position="right"
          />
        </div>
        <div class="center">
          <el-input-number
            v-model="HJNewJsonStore.css.modulePadding.top"
            controls-position="right"
          />
          <el-input-number
            v-model="HJNewJsonStore.css.modulePadding.bottom"
            controls-position="right"
          />
        </div>
        <div class="right">
          <el-input-number
            v-model="HJNewJsonStore.css.modulePadding.right"
            controls-position="right"
          />
        </div>
      </div>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import appStore from '@/store';

  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
</script>
<style lang="scss" scoped>
  .margin-editor-box {
    .el-form-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .padding-setting-box {
        display: flex;
        justify-content: space-between;
        width: 70%;
        align-items: center;
        :deep(.el-input__wrapper) {
          padding-left: 0;
          padding-right: 25px;
        }
        .left,
        .right,
        .center {
          width: 30px;
          .el-input-number {
            width: 65px;
          }
        }
        .center {
          .el-input-number {
            margin: 12px 0;
          }
        }
      }
    }
  }
</style>
