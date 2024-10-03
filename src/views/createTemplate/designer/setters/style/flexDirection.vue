<template>
  <div class="height-editor-box">
    <el-form-item size="default" label="布局方式:">
      <el-radio-group v-model="module.css.flexDirection">
        <el-radio label="row">水平</el-radio>
        <el-radio label="column">垂直</el-radio>
      </el-radio-group>
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
      }
    }
    .unit {
      margin-left: 10px;
      color: #929292;
      letter-spacing: 2px;
    }
  }
</style>
