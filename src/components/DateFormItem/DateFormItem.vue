<template>
  <el-form-item label="日期选择:">
    <el-date-picker
      v-model="item.date[0]"
      type="month"
      placeholder="开始月份"
      :clearable="false"
      format="YYYY-MM"
      @change="handleStartDateChange"
    />
    -
    <el-date-picker
      v-model="item.date[1]"
      type="month"
      placeholder="结束月份"
      :clearable="false"
      format="YYYY-MM"
      @change="handleEndDateChange"
    />
    <el-switch v-model="modelItem.data.isShow.date" @change="handlSwitch" />
  </el-form-item>
  <el-form-item label="">
    <el-radio v-model="radioValue" label="至今" @change="handleRadioChange">至今</el-radio>
  </el-form-item>
</template>
<script lang="ts" setup>
  import { IMATERIALITEM } from '@/interface/material';
  const emit = defineEmits([
    'handleEndDateChange',
    'handleStartDateChange',
    'handleRadioChange',
    'handlSwitch',
    'update:item',
    'update:modelItem'
  ]);
  const props = defineProps<{
    modelItem: IMATERIALITEM;
    item: any;
  }>();

  const item = computed({
    get() {
      return props.item;
    },
    set(item: any) {
      emit('update:item', item);
    }
  });

  const modelItem = computed({
    get() {
      return props.modelItem;
    },
    set(modelItem: any) {
      emit('update:modelItem', modelItem);
    }
  });

  const radioValue = ref<string>(props.item.date[1]);
  const handleRadioChange = (value: string) => {
    if (value) {
      emit('handleRadioChange', value);
    }
  };
  // 结束日期改变
  const handleEndDateChange = (value: string) => {
    console.log('结束日期改变', value);
    emit('handleEndDateChange', value);
    if (value) {
      radioValue.value = '';
    }
  };
  // 开始日期改变
  const handleStartDateChange = (value: string) => {
    console.log('开始 日期改变', value);
    emit('handleStartDateChange', value);
  };

  // 是否显示日期开关
  const handlSwitch = (value: boolean) => {
    emit('handlSwitch', value);
  };
</script>
