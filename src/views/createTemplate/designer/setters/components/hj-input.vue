<template>
  <div class="field">
    <span class="label">{{ module.dataSource[keyValue].label }}</span>
    <el-input v-model="module.dataSource[keyValue].value" size="large"></el-input>
  </div>
</template>
<script lang="ts" setup>
  import { useGetSelectedModule } from '../../hooks/useGetSelectedModule';

  const props = defineProps<{
    id: string;
    keyValue: string;
  }>();

  // 选中的module
  const module = useGetSelectedModule(props.id);
</script>
<style lang="scss" scoped>
  .field {
    margin-bottom: 24px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    .label {
      display: flex;
      font-size: 16px;
      line-height: 20px;
      color: rgb(130, 139, 162);
      margin-left: 1px;
    }
    .el-input {
      height: 48px;
    }
  }
</style>
