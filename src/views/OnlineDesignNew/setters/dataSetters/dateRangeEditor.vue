<template>
  <div class="date-range-editor-box">
    <el-form-item label="日期选择:">
      <el-date-picker
        v-model="widgetItem.dataSource.dateRange[0]"
        type="date"
        placeholder="开始日期"
        :clearable="false"
        value-format="YYYY.MM.DD"
        @change="handleStartDateChange"
      />
      -
      <el-date-picker
        v-model="widgetItem.dataSource.dateRange[1]"
        type="date"
        placeholder="结束日期"
        :clearable="false"
        value-format="YYYY.MM.DD"
        @change="handleEndDateChange"
      />
    </el-form-item>

    <el-form-item label="">
      <el-radio v-model="radioValue" label="至今" @change="handleRadioChange">至今</el-radio>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import useSelectWidgetItem from '../../hooks/useSelectWidgetItem';

  const props = defineProps<{
    id: string;
  }>();

  // 选中的widgetItem
  const { widgetItem } = useSelectWidgetItem(props.id);

  const radioValue = ref<string>(widgetItem.dataSource.dateRange[1]);
  const handleRadioChange = (value: string) => {
    console.log('handleRadioChange', value);
    widgetItem.dataSource.dateRange[1] = value;
  };

  // 结束日期改变
  const handleEndDateChange = (value: string) => {
    console.log('结束日期改变', value);
    widgetItem.dataSource.dateRange[1] = value;
    if (value) {
      radioValue.value = '';
    }
  };
  // 开始日期改变
  const handleStartDateChange = (value: string) => {
    widgetItem.dataSource.dateRange[0] = value;
  };
</script>
<style lang="scss" scoped>
  .date-range-editor-box {
    :deep(.el-date-editor) {
      width: 110px;
    }
  }
</style>
