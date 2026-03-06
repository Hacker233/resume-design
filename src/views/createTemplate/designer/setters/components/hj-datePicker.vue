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
      <div class="date-picker-container">
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
      </div>
      <div class="radio-container">
        <template v-if="!isEditing">
          <el-tooltip :content="customLabel" placement="top" :disabled="customLabel.length <= 2">
            <el-radio
              v-model="radioValue"
              size="large"
              :label="customLabel"
              class="custom-radio"
              @change="handleRadioChange"
              >{{ customLabel }}</el-radio
            >
          </el-tooltip>
          <el-icon class="edit-icon" @click="startEdit">
            <Edit />
          </el-icon>
        </template>
        <el-input
          v-else
          ref="editInputRef"
          v-model="tempLabel"
          class="edit-input"
          size="large"
          maxlength="20"
          show-word-limit
          style="width: 140px; margin-left: 10px"
          @blur="finishEdit"
          @keyup.enter="finishEdit"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import moment from 'moment';
  import { Edit } from '@element-plus/icons-vue';

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
      if (newVal[1] && !/^\d{4}-\d{2}$/.test(newVal[1])) {
        customLabel.value = newVal[1];
      }
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
  const customLabel = ref(
    props.modelValue[1] && !/^\d{4}-\d{2}$/.test(props.modelValue[1]) ? props.modelValue[1] : '至今'
  );
  const isEditing = ref(false);
  const tempLabel = ref('');
  const editInputRef = ref();

  const handleRadioChange = (value: string) => {
    radioValue.value = value;
    if (value) {
      emit('update:modelValue', [startDate.value, value]);
    }
  };

  const startEdit = () => {
    tempLabel.value = customLabel.value;
    isEditing.value = true;
    nextTick(() => {
      editInputRef.value?.focus();
    });
  };

  const finishEdit = () => {
    if (tempLabel.value.trim()) {
      customLabel.value = tempLabel.value.trim();
      radioValue.value = customLabel.value;
      emit('update:modelValue', [startDate.value, customLabel.value]);
    }
    isEditing.value = false;
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
      justify-content: flex-start;
      width: 100%;
      .date-picker-container {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 5px;
        min-width: 0;
        :deep(.el-date-editor) {
          flex: 1;
          min-width: 0;
        }
      }
      .radio-container {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        margin-left: 10px;
      }
      .fenge {
        margin: 0 5px;
        font-weight: 600;
        flex-shrink: 0;
      }
      .el-radio {
        margin-left: 0;
        margin-right: 0;
      }
      .custom-radio {
        max-width: 60px;
        :deep(.el-radio__label) {
          max-width: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .edit-icon {
        cursor: pointer;
        padding: 3px;
        transition: all 0.3s;
        margin-left: 4px;
        font-size: 22px;
        color: #1e2532;
        &:hover {
          background-color: #eee;
          border-radius: 4px;
        }
      }
      .edit-input {
        height: auto !important;
      }
    }

    .el-input {
      height: 48px;
    }
  }
</style>
