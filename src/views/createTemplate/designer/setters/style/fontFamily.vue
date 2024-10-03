<template>
  <div class="font-family-editor-box">
    <el-form-item label="字体选择:" size="default">
      <el-select
        v-model="module.css.fontFamily"
        :teleported="false"
        placeholder="请选择字体"
        @change="secondFontFamilyChange"
      >
        <el-option
          v-for="(item, index) in fontFamilyList"
          :key="index"
          :label="item"
          :value="item"
          :style="{ fontFamily: item }"
        />
      </el-select>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { useFontFamilyList } from '../../hooks/useFontFamlyList';
  import { useGetSelectedModule } from '../../hooks/useGetSelectedModule';

  const props = defineProps<{
    id: string;
    pageIndex: number;
  }>();

  // 选中的module
  const module = useGetSelectedModule(props.id);

  // 字体列表
  const fontFamilyList = useFontFamilyList();

  // 字体变化
  const secondFontFamilyChange = (value: string) => {
    console.log(value);
  };
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
</style>
