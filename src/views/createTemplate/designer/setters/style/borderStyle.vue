<template>
  <div class="border-style-editor-box">
    <el-form-item label="边框样式:">
      <el-popover placement="top" :width="300" trigger="click">
        <!-- 边框样式选项 -->
        <div class="border-editor-style-list">
          <div
            v-for="(item, index) in borderStyleList"
            :key="index"
            class="border"
            :style="{ borderStyle: item, borderColor: module.css.borderColor }"
            @click="changeBorderStyle(item)"
          ></div>
        </div>
        <template #reference>
          <div class="border-style"></div>
        </template>
      </el-popover>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { useModuleWithStyle } from './useModuleWithStyle';

  const props = defineProps<{
    id?: string;
    customCssProp?: string;
  }>();

  // 选中的module
  const { module } = useModuleWithStyle(props.id, props.customCssProp);

  // 边框样式映射表
  const borderStyleList = ['dashed', 'dotted', 'double', 'groove', 'inset', 'outset', 'solid'];

  // 切换borderStyle
  const changeBorderStyle = (item: string) => {
    module.value.css.borderStyle = item;
  };
</script>
<style lang="scss" scoped>
  .border-style-editor-box {
    :deep(.border-style-list) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .border {
        width: 30%;
        border-width: 5px;
        border-left: none;
        border-right: none;
        cursor: pointer;
      }
    }
    .border-style {
      width: 120px;
      height: 30px;
      border-width: 5px;
      border-color: v-bind('module.css.borderColor');
      border-style: v-bind('module.css.borderStyle');
      cursor: pointer;
      transition: all 0.3s;
    }
  }
</style>
<style lang="scss">
  .border-editor-style-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 140px;
    align-content: space-evenly;
    .border {
      cursor: pointer;
      width: 30%;
      height: 30px;
      border-width: 3px;
      border-left: none;
      border-right: none;
      border-bottom: none;
    }
  }
</style>
