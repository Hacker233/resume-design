<template>
  <div class="field">
    <div v-if="showTop" class="field-top">
      <div class="label-left">
        <span class="label">{{ label }}</span>
        <slot name="label-left"></slot>
        <!-- AI操作 -->
        <ai-button v-model="inputValue" :module-id="moduleId"></ai-button>
      </div>
      <div class="label-right">
        <slot name="component-switch"></slot>
        <slot name="label-right"></slot>
      </div>
    </div>
    <comm-editor v-model="inputValue"></comm-editor>
  </div>
</template>

<script lang="ts" setup>
  import AiButton from '../../components/AiButton.vue';

  const emit = defineEmits(['update:modelValue']);

  interface TP {
    modelValue: string | number;
    label: string;
    keyValue: string;
    showTop?: boolean;
    moduleId?: string;
  }

  const props = withDefaults(defineProps<TP>(), {
    modelValue: '',
    label: '',
    keyValue: '',
    showTop: true,
    moduleId: ''
  });

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
      .label-right {
        display: flex;
        align-items: center;
      }
    }

    .editor-box {
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      overflow: hidden;
      transition: all 0.3s;
      cursor: auto;
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
