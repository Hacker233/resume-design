<template>
  <div class="font-size-editor-box">
    <el-form-item label="字号选择:" size="default">
      <el-select
        v-model="module.css.fontSize"
        :teleported="true"
        size="default"
        placeholder="请选择字号"
      >
        <el-option
          v-for="(item, index) in fontSizeList"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <span class="unit">像素</span>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { useFontSizeList } from '../../hooks/useFontSizeList';
  import { useGetSelectedModule } from '../../hooks/useGetSelectedModule';

  const props = defineProps<{
    id: string;
  }>();

  // 选中的module
  const module = useGetSelectedModule(props.id);

  // 字号列表
  const fontSizeList = useFontSizeList();
</script>
<style lang="scss" scoped>
  .el-form-item {
    display: flex;
    .el-form-item__content {
      flex: 1;
      display: flex;
      .el-select {
        flex: 1;
      }
    }
  }
  .unit {
    margin-left: 10px;
    color: #929292;
    letter-spacing: 2px;
  }
</style>
