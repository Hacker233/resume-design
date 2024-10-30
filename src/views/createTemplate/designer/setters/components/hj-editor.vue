<template>
  <div class="field">
    <div class="field-top">
      <div class="label-left">
        <span class="label">{{ label }}</span>
        <slot name="label-left"></slot>
      </div>
      <slot name="label-right"></slot>
    </div>
    <comm-editor v-model="inputValue"></comm-editor>
  </div>
</template>

<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';

  const emit = defineEmits(['update:modelValue']);

  const props = defineProps<{
    modelValue: string | number;
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

    .editor-box {
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      overflow: hidden;
      transition: all 0.3s;
      &:hover {
        border: 1px solid #d4d5d8;
      }
      :deep(.w-e-select-list) {
        ul {
          height: 150px;
          overflow: auto;
        }
      }
    }
  }
</style>
