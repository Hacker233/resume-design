<template>
  <div class="width-editor-box">
    <el-form-item size="default" label="宽度:">
      <el-input-number
        v-model="numericWidth"
        size="default"
        :min="0"
        :max="unit === '%' ? 100 : Infinity"
        :step="unit === '%' ? 1 : 1"
      />
      <span class="unit">{{ unit }}</span>
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
  import { useModuleWithStyle } from './useModuleWithStyle';

  const props = defineProps<{
    id: string;
    customCssProp?: string;
  }>();

  // 获取选中的模块
  const { module } = useModuleWithStyle(props.id, props.customCssProp);

  // 提取并处理高度
  const numericWidth = ref<number | null>(null); // 记录数值类型的高度
  const unit = ref('px'); // 单位 (px 或 %)

  // 监控并处理初始的高度值
  watch(
    () => module.value.css.width,
    (newVal) => {
      if (typeof newVal === 'string' && newVal.includes('%')) {
        numericWidth.value = parseFloat(newVal); // 提取百分比的数值
        unit.value = '%';
      } else if (typeof newVal === 'number' || typeof newVal === 'string') {
        numericWidth.value = parseFloat(newVal as string); // 处理数值类型
        unit.value = 'px';
      }
    },
    { immediate: true }
  );

  // 当数值或单位发生变化时，更新 module 的高度值
  watch([numericWidth, unit], () => {
    if (numericWidth.value !== null) {
      module.value.css.width =
        unit.value === '%' ? `${numericWidth.value}%` : `${numericWidth.value}px`;
    }
  });
</script>

<style lang="scss" scoped>
  .width-editor-box {
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
    .unit {
      margin-left: 10px;
      color: #929292;
      letter-spacing: 2px;
    }
  }
</style>
