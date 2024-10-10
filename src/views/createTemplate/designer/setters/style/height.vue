<template>
  <div class="height-editor-box">
    <el-form-item size="default" label="高度:">
      <el-input-number
        v-model="numericHeight"
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
    id?: string;
    customCssProp?: string;
  }>();

  // 获取选中的模块
  const { module } = useModuleWithStyle(props.id, props.customCssProp);

  // 提取并处理高度
  const numericHeight = ref<number | null>(null); // 记录数值类型的高度
  const unit = ref('px'); // 单位 (px 或 %)

  // 监控并处理初始的高度值
  watch(
    () => module.value.css.height,
    (newVal) => {
      if (typeof newVal === 'string' && newVal.includes('%')) {
        numericHeight.value = parseFloat(newVal); // 提取百分比的数值
        unit.value = '%';
      } else if (typeof newVal === 'number' || typeof newVal === 'string') {
        numericHeight.value = parseFloat(newVal as string); // 处理数值类型
        unit.value = 'px';
      }
    },
    { immediate: true }
  );

  // 当数值或单位发生变化时，更新 module 的高度值
  watch([numericHeight, unit], () => {
    if (numericHeight.value !== null) {
      module.value.css.height =
        unit.value === '%' ? `${numericHeight.value}%` : `${numericHeight.value}px`;
    }
  });
</script>

<style lang="scss" scoped>
  .height-editor-box {
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
