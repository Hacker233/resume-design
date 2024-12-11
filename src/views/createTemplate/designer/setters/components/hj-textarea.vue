<template>
  <div class="field">
    <div v-if="showTop" class="field-top">
      <div class="label-left">
        <span class="label">{{ label }}</span>
        <slot name="label-left"></slot>
      </div>
      <div class="label-right">
        <slot name="component-switch"></slot>
        <slot name="label-right"></slot>
      </div>
    </div>
    <el-input
      v-model="inputValue"
      size="large"
      :autosize="{ minRows: 2, maxRows: 8 }"
      type="textarea"
      :disabled="disabled"
      @change="handleChange"
    ></el-input>
  </div>
</template>

<script lang="ts" setup>
  const emit = defineEmits(['update:modelValue']);

  interface TP {
    modelValue: string | number;
    label: string;
    keyValue: string;
    disabled?: boolean;
    showTop?: boolean;
  }

  const props = withDefaults(defineProps<TP>(), {
    modelValue: '',
    label: '',
    keyValue: '',
    disabled: false,
    showTop: true
  });

  // 添加一个可响应的 inputValue，并监听 modelValue 的变化
  const inputValue = ref(props.modelValue);

  watch(
    () => props.modelValue,
    (newVal) => {
      inputValue.value = newVal;
    }
  );

  const handleChange = (value: string) => {
    emit('update:modelValue', value);
  };

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
      .label-right {
        display: flex;
        align-items: center;
      }
    }

    .el-input {
      height: 48px;
    }
  }
</style>
