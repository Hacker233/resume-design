<template>
  <div class="height-editor-box">
    <el-form-item size="default" label="学历：">
      <el-input v-model="module.dataSource.degree" size="default" />
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
  .height-editor-box {
    .el-form-item {
      display: flex;
      .el-form-item__content {
        flex: 1;
        display: flex;
        .el-input {
          flex: 1;
        }
      }
    }
  }
</style>
