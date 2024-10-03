<template>
  <div class="font-weight-editor-box">
    <el-form-item label="字体粗细:" size="default">
      <el-input-number v-model="module.css.fontWeight" :min="0" :max="1000" :step="100" />
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
  .el-form-item {
    display: flex;
    .el-form-item__content {
      flex: 1;
      display: flex;
      .el-input-number {
        flex: 1;
      }
    }
  }
</style>
