<template>
  <div class="margin-editor-box">
    <el-form-item label="外边距:">
      <div class="padding-setting-box">
        <div class="left">
          <el-input-number v-model="module.css.margin.left" :min="0" controls-position="right" />
        </div>
        <div class="center">
          <el-input-number v-model="module.css.margin.top" :min="0" controls-position="right" />
          <el-input-number v-model="module.css.margin.bottom" :min="0" controls-position="right" />
        </div>
        <div class="right">
          <el-input-number v-model="module.css.margin.right" :min="0" controls-position="right" />
        </div>
      </div>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { useGetSelectedModule } from '../../hooks/useGetSelectedModule';

  const props = defineProps<{
    id: string;
  }>();

  // 选中的module
  const module = useGetSelectedModule(props.id);
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
