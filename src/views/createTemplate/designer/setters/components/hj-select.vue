<template>
  <div class="field">
    <div class="field-top">
      <div class="label-left">
        <span class="label">{{ label }}</span>
        <slot name="label-left"></slot>
      </div>
      <slot name="label-right"></slot>
    </div>
    <el-select
      v-model="inputValue"
      size="large"
      style="width: 100%"
      :placeholder="`请选择${label}`"
    >
      <el-option
        v-for="(item, index) in selectOptions[keyValue]"
        :key="index"
        :label="item.value"
        :value="item.value"
      />
    </el-select>
  </div>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import selectOptions from '../../utils/getSelectOptions';

  const emit = defineEmits(['update:modelValue']);

  const props = defineProps<{
    modelValue: string;
    label: string;
    keyValue: string;
    module: IModule;
  }>();

  // 添加一个可响应的 inputValue，并监听 modelValue 的变化
  const inputValue = ref(props.modelValue);

  watch(
    () => props.modelValue,
    (newVal) => {
      inputValue.value = newVal;
    }
  );

  // 监听 inputValue 变化，触发 update:modelValue
  watch(inputValue, (newValue) => {
    emit('update:modelValue', newValue);
  });
</script>
<style lang="scss" scoped>
  .field {
    margin-bottom: 24px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .field-top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .label-left {
        display: flex;
        align-items: center;
        .label {
          display: flex;
          font-size: 16px;
          line-height: 20px;
          color: rgb(130, 139, 162);
          margin-left: 1px;
        }
      }
    }
    :deep(.el-select) {
      height: 48px;
      .el-input {
        height: 48px;
      }
    }
  }
</style>
