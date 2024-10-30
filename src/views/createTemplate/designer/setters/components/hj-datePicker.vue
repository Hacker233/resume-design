<template>
  <div class="field">
    <div class="field-top">
      <div class="label-left">
        <span class="label">{{ label }}</span>
        <slot name="label-left"></slot>
      </div>
      <slot name="label-right"></slot>
    </div>
    <div class="field-bottom">
      <el-date-picker
        v-model="startDate"
        type="month"
        size="large"
        placeholder="开始月份"
        :clearable="false"
        format="YYYY-MM"
      />
      <span class="fenge">-</span>
      <el-date-picker
        v-model="endDate"
        type="month"
        size="large"
        placeholder="结束月份"
        :clearable="false"
        format="YYYY-MM"
        @change="handleEndDateChange"
      />
      <el-radio v-model="radioValue" size="large" label="至今" @change="handleRadioChange"
        >至今</el-radio
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import moment from 'moment';

  const emit = defineEmits(['update:modelValue']);

  const props = defineProps<{
    modelValue: any;
    label: string;
    keyValue: string;
    module: IModule;
  }>();

  // 开始日期
  const startDate = ref(props.modelValue[0]);
  // 结束日期
  const endDate = ref(props.modelValue[1]);

  watch(
    () => props.modelValue,
    (newVal) => {
      startDate.value = newVal[0];
      endDate.value = newVal[1];
    }
  );

  // 监听 inputValue 变化，触发 update:modelValue
  watch(startDate, (newValue) => {
    const newDate = formattedDate(newValue);
    emit('update:modelValue', [newDate, endDate.value]);
  });

  // 监听 inputValue 变化，触发 update:modelValue
  watch(endDate, (newValue) => {
    const newDate = formattedDate(newValue);
    emit('update:modelValue', [startDate.value, newDate]);
  });

  // 结束日期变化
  const handleEndDateChange = () => {
    radioValue.value = '';
  };

  // 至今
  const radioValue = ref<any>(props.modelValue[1]);
  const handleRadioChange = (value: string) => {
    radioValue.value = value;
    if (value) {
      emit('update:modelValue', [startDate.value, value]);
    }
  };

  // 格式化日期
  const formattedDate = (dateString: any) => {
    // 使用正则表达式判断是否为 YYYY-MM 格式的字符串
    if (typeof dateString === 'string' || /^\d{4}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    // 如果不是 YYYY-MM 格式，则进行格式化
    return moment(dateString).format('YYYY-MM');
  };
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
    .field-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .fenge {
        margin: 0 5px;
        font-weight: 600;
      }
      :deep(.el-date-editor) {
        flex: 1;
        height: 48px;
        .el-input__wrapper {
          height: 48px;
        }
      }
      .el-radio {
        margin-left: 10px;
      }
    }

    .el-input {
      height: 48px;
    }
  }
</style>
