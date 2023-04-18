<template>
  <div class="month-range-editor-box">
    <el-form-item label="月份选择:">
      <el-date-picker
        v-model="widgetItem.dataSource.monthRange[0]"
        type="month"
        placeholder="开始月份"
        :clearable="false"
        @change="handleStartDateChange"
      />
      -
      <el-date-picker
        v-model="widgetItem.dataSource.monthRange[1]"
        type="month"
        placeholder="结束月份"
        :clearable="false"
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
    pageIndex: number;
  }>();

  // 选中的widgetItem
  const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex);

  const radioValue = ref<string>(widgetItem.dataSource.monthRange[1]);
  const handleRadioChange = (value: string) => {
    console.log('handleRadioChange', value);
    widgetItem.dataSource.monthRange[1] = value;
  };

  // 结束日期改变
  const handleEndDateChange = (value: string) => {
    console.log('结束日期改变', value);
    widgetItem.dataSource.monthRange[1] = value;
    if (value) {
      radioValue.value = '';
    }
  };
  // 开始日期改变
  const handleStartDateChange = (value: string) => {
    widgetItem.dataSource.monthRange[0] = value;
  };
</script>
